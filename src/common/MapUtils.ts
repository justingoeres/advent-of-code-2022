export class MapUtils {
    static filter<TKey, TValue>(map: Map<TKey, TValue>, filterFunction: (key: TKey, value: TValue) => boolean): Map<TKey, TValue> {
        // from https://stackoverflow.com/a/72283211
        const filteredMap:
            Map<TKey, TValue> = new Map<TKey, TValue>();

        map.forEach((value, key) => {
            if (filterFunction(key, value)) {
                filteredMap.set(key, value);
            }
        });

        return filteredMap;
    }


}