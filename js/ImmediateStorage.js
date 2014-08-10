angular.module('ImmediateStorage', [])
    .factory('StorageKey', function() {
        function StorageKey(key) {
            this.key = key;
        }

        StorageKey.prototype.get = function() {
            var value = localStorage.getItem(this.key);
            return value ? JSON.parse(value) : value;
        };

        StorageKey.prototype.set = function (value) {
            localStorage.setItem(this.key, JSON.stringify(value));
        };

        StorageKey.prototype.delete = function () {
            localStorage.removeItem(this.key);
        };

        return StorageKey;
    })
    .factory('StorageKeysContainer', ['StorageKey', function(StorageKey) {
        var allKeysKeyPrefix = '$$ImmediateStorageAllKeys_';

        function StorageKeysContainer(name) {
            this.allKeysKey = allKeysKeyPrefix + name;
            this.keyPrefix = name + '.';
            this.storageKeys = { };
            this._allKeysStorage = new StorageKey(this.allKeysKey);
        }

        StorageKeysContainer.prototype.add = function(key, value) {
            var storageKey = new StorageKey(this.keyPrefix + key);
            storageKey.set(value);
            this.storageKeys[key] = storageKey;
            saveKey.bind(this)(key);
        };

        StorageKeysContainer.prototype.update = function(key, value) {
            this.storageKeys[key].set(value);
        };

        StorageKeysContainer.prototype.delete = function(key) {
            this.storageKeys[key].delete();
            removeKey.bind(this)(key);
        };

        StorageKeysContainer.prototype.load = function() {
            var self = this,
                keys = getKeys.bind(this)();

            angular.forEach(keys, function(key) {
                self.storageKeys[key] = new StorageKey(self.keyPrefix + key);
                saveKey.bind(self)(key);
            });
        };

        function getKeys() {
            return this._allKeysStorage.get() || [];
        }

        function saveKey(key) {
            var allKeysOld = this._allKeysStorage.get() || [];

            if(hasKey(key, allKeysOld)) return;

            allKeysOld.push(key);
            this._allKeysStorage.set(allKeysOld);
        }

        function removeKey(key) {
            var allKeys = getKeys.bind(this)();
            var i = allKeys.indexOf(key);
            allKeys.splice(i, 1);

            this._allKeysStorage.set(allKeys);
        }

        function hasKey(key, keys) {
            return keys.indexOf(key) != -1;
        }

        return StorageKeysContainer;
    }])
    .factory('ImmediateStorageService', ['StorageKeysContainer', function(StorageKeysContainer) {
        function ImmediateStorageService(name) {
            var self = this;

            this.$$container = new StorageKeysContainer(name);
            this.$$container.load();

            angular.forEach(this.$$container.storageKeys, function(storageKey) {
                var key = originalKey(storageKey.key, name);
                self[key] = storageKey.get();
            });

            observe(this);
        }

        function observe(self) {
            Object.observe(self, function(changes) {
                angular.forEach(changes, handleChange.bind(self));
            });
        }

        function handleChange(change) {
            this.$$container[change.type](change.name, change.object[change.name]);
        }

        function originalKey(key, name) {
            return key.substr(name.length + 1);
        }

        return ImmediateStorageService;
    }]);