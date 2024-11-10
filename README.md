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
✓ test/simHash.bench.ts (10) 56774ms
   ✓ simHash (5) 12264ms
     name                               hz      min      max     mean      p75      p99     p995     p999     rme  samples
   · simhash 1 random string      2,083.04   0.0518   1.0058   0.4801   0.6830   0.9549   0.9644   0.9802  ±3.21%     1043   fastest
   · simhash 10 random strings      213.90   2.7978   7.0510   4.6750   5.2650   6.8972   7.0510   7.0510  ±3.30%      107
   · simhash 100 random strings    21.3373  44.1999  49.4976  46.8664  48.1344  49.4976  49.4976  49.4976  ±2.53%       11
   · simhash 300 random strings     7.2749   129.05   141.07   137.46   140.56   141.07   141.07   141.07  ±2.11%       10
   · simhash 1000 random strings    2.1593   446.01   478.71   463.12   468.98   478.71   478.71   478.71  ±1.48%       10   slowest
   ✓ findNearDuplicatesSimHash (5) 44508ms
     name                                     hz       min       max      mean       p75       p99      p995      p999     rme  samples
   · small strings                      3,671.16    0.2435    1.0121    0.2724    0.3050    0.3723    0.3960    0.4288  ±0.66%     1836   fastest
   · 10 random strings (20-300 words)     213.30    2.6500    6.4142    4.6882    5.2627    6.4088    6.4142    6.4142  ±3.14%      107
   · 100 random strings (20-300 words)   19.7228   47.9660   52.6941   50.7028   51.6620   52.6941   52.6941   52.6941  ±2.08%       10
   · 500 random strings (20-300 words)    3.2278    301.06    316.73    309.81    314.19    316.73    316.73    316.73  ±1.34%       10
   · 2k random strings (20-300 words)     0.4570  2,173.06  2,217.13  2,188.36  2,195.14  2,217.13  2,217.13  2,217.13  ±0.52%       10   slowest
 ✓ test/levenshtein.bench.ts (5) 3823ms
   ✓ findNearDuplicatesLevenshtein (5) 3822ms
     name                                      hz      min      max     mean      p75      p99     p995     p999     rme  samples
   · small strings                      20,332.35   0.0478   0.2516   0.0492   0.0483   0.0606   0.1190   0.2017  ±0.36%    10167   fastest
   · 10 random strings (20-300 words)   14,485.47   0.0319   0.2915   0.0690   0.0742   0.1667   0.1928   0.2552  ±0.65%     7243
   · 100 random strings (20-300 words)   1,168.20   0.7366   1.2375   0.8560   0.8755   1.0863   1.1322   1.2375  ±0.60%      585
   · 500 random strings (20-300 words)     130.45   7.3067   8.4357   7.6660   7.8399   8.4357   8.4357   8.4357  ±0.76%       66
   · 2k random strings (20-300 words)     12.4604  79.1898  81.4866  80.2543  80.6677  81.4866  81.4866  81.4866  ±0.69%       10   slowest
```
