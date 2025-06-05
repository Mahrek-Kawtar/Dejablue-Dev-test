package charge

import (
    "testing"
    "time"
)
//task 2
func TestEstimatedPriceForRemainingCharge(t *testing.T) {
	remaining := 40.0 // 40 kWha

	tests := []struct {
		rate     float64
		expected float64
	}{
		{rate: 0.25, expected: 10},  // 40 * 0.25 = 10 dollars
		{rate: 0.30, expected: 12},  // 40 * 0.30 = 12 dollars
		{rate: 0.40, expected: 16},  // 40 * 0.40 = 16 dollars
	}

	for _, test := range tests {
		got := EstimatedPriceForRemainingCharge(remaining, test.rate)
		if got != test.expected {
			t.Errorf("For rate %f, expected %f but got %f", test.rate, test.expected, got)
		}
	}
}*/
// Task 3: test for CheapestChargeWindowECO(to add)
func TestCheapestChargeWindowECO(t *testing.T) {
    now := time.Date(2025, 6, 4, 10, 0, 0, 0, time.UTC) // fixed start time
    remainingCharge := 20.0                             // 20 kWh to charge
    maxPower := 7.0                                    // max power in kW

    start, end, price := CheapestChargeWindowECO(now, remainingCharge, maxPower)

    if end.Before(start) {
        t.Errorf("End time %v is before start time %v", end, start)
    }

    duration := end.Sub(start).Hours()
    expectedDuration := remainingCharge / maxPower

    if duration < expectedDuration {
        t.Errorf("Charging window too short: got %f hours, want at least %f", duration, expectedDuration)
    }

    if price <= 0 {
        t.Errorf("Expected price > 0, got %f", price)
    }
}