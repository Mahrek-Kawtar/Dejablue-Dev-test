package charge

import ("time")


//task 2
func VariableRateAt(t time.Time) float64 {
	weekday := t.Weekday()
	hour := t.Hour()

	isWeekend := weekday == time.Saturday || weekday == time.Sunday

	switch {
	case !isWeekend && hour >= 17 && hour < 21:
		return 0.40 // Peak
	case (!isWeekend && ((hour >= 7 && hour < 17) || (hour >= 21 && hour < 22))) ||
		(isWeekend && hour >= 7 && hour < 22):
		return 0.30 // Shoulder
	default:
		return 0.25 // Off-peak
	}
}
//task 2
func EstimatedPriceForRemainingCharge(remainingCharge float64, rateDollarsPerKwh float64) float64 {
	// price = remainingCharge * rate (dollars)
	return remainingCharge * rateDollarsPerKwh
}

