package charge

import ("time")


 //TASK 1
 const costPerKwH float64 = 0.2

func EstimatedPriceInCentsForCharge(startTime time.Time, duration time.Duration, drawKwHPerMin float64) float64 {
	return float64(duration.Minutes()) * costPerKwH * drawKwHPerMin
}



