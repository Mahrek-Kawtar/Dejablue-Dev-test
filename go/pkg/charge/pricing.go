package charge

import ("time")
import ("math") //task3


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

//Task 3 (we add this part)
// CheapestChargeWindowECO calculates the cheapest continuous charging window within the next 12 hours for ECO mode,
// assuming max power charge level and constant power draw during charging.
// Returns the start time, end time, and total estimated cost.
func CheapestChargeWindowECO(now time.Time, remainingCharge, maxPower float64) (start time.Time, end time.Time, totalCost float64) {
	durationHours := remainingCharge / maxPower
	bestCost := math.MaxFloat64
	var bestStart time.Time

	// Check every possible start time in 15-minute increments over the next 12 hours
	for offsetMinutes := 0; offsetMinutes <= 12*60; offsetMinutes += 15 {
		candidateStart := now.Add(time.Duration(offsetMinutes) * time.Minute)
		candidateEnd := candidateStart.Add(time.Duration(durationHours * float64(time.Hour)))

		cost := 0.0
		t := candidateStart

		// Calculate total cost by summing cost over each hourly segment within the charging window
		for t.Before(candidateEnd) {
			rate := VariableRateAt(t)
			nextHour := t.Truncate(time.Hour).Add(time.Hour)

			segmentEnd := candidateEnd
			if nextHour.Before(segmentEnd) {
				segmentEnd = nextHour
			}

			segmentDuration := segmentEnd.Sub(t).Hours()
			energyUsed := maxPower * segmentDuration
			cost += energyUsed * rate

			t = segmentEnd
		}

		if cost < bestCost {
			bestCost = cost
			bestStart = candidateStart
		}
	}

	return bestStart, bestStart.Add(time.Duration(durationHours * float64(time.Hour))), bestCost
}