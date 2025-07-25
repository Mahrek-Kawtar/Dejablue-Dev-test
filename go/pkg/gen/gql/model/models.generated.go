// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

import (
	"fmt"
	"io"
	"strconv"
	"time"
)

type ChargeEstimates struct {
	EstimatedPrice     float64 `json:"estimatedPrice"`
	EstimatedTimeHours float64 `json:"estimatedTimeHours"`
}

type Charger struct {
	ID       string        `json:"id"`
	PowerKwH int           `json:"powerKwH"`
	Status   ChargerStatus `json:"status"`
}

type ChargerState struct {
	ChargerStatus ChargerStatus `json:"chargerStatus"`
}

type CheapestChargeWindow struct {
	StartTime      *time.Time `json:"startTime,omitempty"`
	EndTime        *time.Time `json:"endTime,omitempty"`
	EstimatedPrice float64    `json:"estimatedPrice"`
}

type Query struct {
}

type Subscription struct {
}

type VehicleStateOfCharge struct {
	CurrentBatteryLevelKwH *float64 `json:"currentBatteryLevelKwH,omitempty"`
	MaxBatteryLevelKwH     *float64 `json:"maxBatteryLevelKwH,omitempty"`
	RangeKmPerKwH          *float64 `json:"rangeKmPerKwH,omitempty"`
}

type ChargerStatus string

const (
	ChargerStatusAvailable ChargerStatus = "Available"
	ChargerStatusPluggedIn ChargerStatus = "PluggedIn"
)

var AllChargerStatus = []ChargerStatus{
	ChargerStatusAvailable,
	ChargerStatusPluggedIn,
}

func (e ChargerStatus) IsValid() bool {
	switch e {
	case ChargerStatusAvailable, ChargerStatusPluggedIn:
		return true
	}
	return false
}

func (e ChargerStatus) String() string {
	return string(e)
}

func (e *ChargerStatus) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = ChargerStatus(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid ChargerStatus", str)
	}
	return nil
}

func (e ChargerStatus) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}
