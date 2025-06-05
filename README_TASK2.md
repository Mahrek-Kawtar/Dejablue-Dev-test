# Task 2 – Estimate Charging Time and Cost with Variable Tariff (Time-Based Pricing)

## Goal

Improve the previous model by adding variable electricity tariffs that depend on the time of day and day of week. This simulates real-world electricity pricing, which is usually higher during peak hours and lower during off-peak hours.

---

## What I did

### Backend

Added a new function in Go:

```go
func VariableRateAt(t time.Time) float64
````

This function:

* Takes a timestamp `t`,
* Returns the applicable tariff (price per kWh in dollars) based on the time.

### Tariff Schedule

| Time Range                   | Day      | Price (\$/kWh) |
| ---------------------------- | -------- | -------------- |
| 17:00 – 21:00                | Weekdays | 0.40           |
| 07:00 – 17:00, 21:00 – 22:00 | Weekdays | 0.30           |
| 07:00 – 22:00                | Weekends | 0.30           |
| All other times              | Any day  | 0.25           |

This structure simulates:

* **Peak hours** (high price),
* **Shoulder hours** (medium price),
* **Off-peak hours** (low price).

---

### Charge Time Calculation

Unlike **Task 1**, the charging power is now taken directly from the charger's **max power rating** (from charger hardware data), **not derived from the price**.

This is because power is a physical limitation of the charger hardware, independent of price changes.

The charging time is computed as:

$$
\text{estimatedTimeHours} = \frac{\text{remaining\_kWh}}{\text{maxChargerPower}}
$$

---

### Price Calculation

The estimated price is calculated dynamically by multiplying the remaining energy needed by the variable rate at the current time:

$$
\text{estimatedPrice} = \text{remaining\_kWh} \times \text{VariableRateAt}(\text{now})
$$

---

### Frontend

* The charge estimate GraphQL query was updated to automatically use the `VariableRateAt(now)` function to get the current applicable rate.
* The React component automatically fetches and displays the updated cost and time estimates whenever the component loads or relevant data changes.

---

This approach models real-world electricity costs more accurately by considering time-dependent pricing, allowing users to see how charging costs vary depending on the time of day.

---
## Conclusion

By implementing time-based variable tariffs and using the charger’s actual max power for charging time calculation, Task 2 provides a more realistic and dynamic estimation of EV charging cost and duration. This enables users to better understand how electricity prices fluctuate throughout the day and helps them make informed decisions about when to charge their vehicles to save money.

```
