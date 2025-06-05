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
}