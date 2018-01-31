/**
 * Add a new value to an average.
 * avg(xs.push(x)) === addToAvg(x, xs.length, avg(xs))
 * This is ment to be used to update denormalizations.
 * @param {number} x   The new value to be included in the average.
 * @param {number} n   The number of values already in the average.
 * @param {number} avg The average to be added to.
 * @return {number}    The new average with x incorperated.
 */
function addToAvg(x, n, avg) {
    var w0 = n / (n + 1); // The fraction of avg that is already there.
    var w1 = 1 / (n + 1); // The fraction of avg that will be x.
    // Compute the new average as a weighted sum of the old average and x.
    return avg * w0 + x * w1;
}

/**
 * Subtract an existing value from an average.
 * This is ment to be used to update denormalizations.
 * @param {number} x   The value to be removed from the average.
 * @param {number} n   The number of values currently in the average.
 * @param {number} avg The average to be subracted from.
 * @return {number}    The new average with x removed.
 */
function subFromAvg(x, n, avg) {
    var w0 = (n - 1) / n; // The fraction of avg that is not x
    var w1 = 1 / n; // The fraction of avg that is x.
    // Reverse the computation in addToAvg.
    return (avg - x * w1) / w0;
}

/**
 * Change a value in an average.
 * This is ment to be used to update denormalizations.
 * @param {number} x_old The old value of x.
 * @param {number} x_new The new value of x.
 * @param {number} n     The number of values in the average.
 * @param {number} avg   The average before x is changed.
 * @return {number}      The new average with x changed.
 */
function changeInAvg(x_old, x_new, n, avg) {
    var w1 = 1 / (n + 1); // The fraction of avg that is x.
    return avg + (x_new - x_old) * w1;
}

/*
avg = subFromAvgDenormalizer (x_old, n, avg)
avg = addToAvgDenormalizer (x_new, n - 1, avg)
// Is equivalent to
avg = changeInAvgDenormalizer (x_old, x_new, n, avg)
 */
