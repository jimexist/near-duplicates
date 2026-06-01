# near-duplicates

[![CI](https://github.com/jimexist/near-duplicates/actions/workflows/ci.yaml/badge.svg)](https://github.com/jimexist/near-duplicates/actions/workflows/ci.yaml)
![NPM Version](https://img.shields.io/npm/v/near-duplicates)

A TypeScript npm package to find near duplicate pairs in a string set.

## Usage

```bash
npm install near-duplicates
```

```typescript
import {
  findNearDuplicates,
  findNearDuplicatesLevenshtein,
  findNearDuplicatesSimHash,
} from "near-duplicates";

findNearDuplicates(["hello", "hallo", "halo"]);

// you can also specify a threshold for the maximum distance
// if not specified, it will be a default value of 12
findNearDuplicates(["hello", "hallo", "halo"], 2);

// another way of finding near duplicates is using sim-hash and comparing hamming distances
findNearDuplicatesSimHash(["hello", "hallo", "halo"]);
```

## Benchmarks

Here's a benchmark:

```text
 ✓ test/simHash.bench.ts > simHash 6075ms
     name                               hz      min      max     mean      p75      p99     p995     p999     rme  samples
   · simhash 1 random string      5,110.27   0.0206   0.7252   0.1957   0.2804   0.4044   0.4410   0.6442  ±2.07%     2556
   · simhash 10 random strings      520.49   0.8857   2.9765   1.9213   2.1339   2.6467   2.7588   2.9765  ±1.95%      261
   · simhash 100 random strings    52.1100  17.7532  20.6061  19.1902  19.7443  20.6061  20.6061  20.6061  ±1.59%       27
   · simhash 300 random strings    17.2415  54.6639  60.3338  57.9997  59.6469  60.3338  60.3338  60.3338  ±2.61%       10
   · simhash 1000 random strings    5.3044   182.90   191.78   188.52   190.47   191.78   191.78   191.78  ±1.20%       10

 ✓ test/simHash.bench.ts > findNearDuplicatesSimHash 20491ms
     name                                     hz      min      max     mean      p75      p99     p995     p999     rme  samples
   · small strings                      9,165.99   0.0984   0.2436   0.1091   0.1095   0.1720   0.1849   0.2189  ±0.31%     4583
   · 10 random strings (20-300 words)     516.42   1.1438   3.7856   1.9364   2.1365   3.0960   3.3427   3.7856  ±2.22%      259
   · 100 random strings (20-300 words)   48.5475  19.0167  22.6300  20.5984  21.2538  22.6300  22.6300  22.6300  ±1.96%       25
   · 500 random strings (20-300 words)    7.6835   128.19   132.69   130.15   130.83   132.69   132.69   132.69  ±0.70%       10
   · 2k random strings (20-300 words)     1.0355   959.39   972.11   965.68   968.48   972.11   972.11   972.11  ±0.29%       10

 ✓ test/levenshtein.bench.ts > findNearDuplicatesLevenshtein 3269ms
     name                                      hz      min      max     mean      p75      p99     p995     p999     rme  samples
   · small strings                      47,636.82   0.0179   1.7409   0.0210   0.0205   0.0351   0.0415   0.1031  ±0.79%    23819
   · 10 random strings (20-300 words)   25,655.15   0.0185   0.1682   0.0390   0.0428   0.0583   0.0785   0.1247  ±0.37%    12828
   · 100 random strings (20-300 words)   2,147.81   0.3924   0.6027   0.4656   0.4815   0.5540   0.5655   0.5919  ±0.37%     1074
   · 500 random strings (20-300 words)     244.33   3.8278   4.6648   4.0929   4.1653   4.4618   4.6648   4.6648  ±0.63%      123
   · 2k random strings (20-300 words)     24.0296  41.0116  42.1365  41.6154  41.8456  42.1365  42.1365  42.1365  ±0.49%       13
```
