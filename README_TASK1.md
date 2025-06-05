````markdown
# Task 1 – Estimate Charging Time and Cost with Fixed Rate and Mode

### Goal

The goal is to calculate **how long it will take to fully charge the vehicle’s battery** and **the total estimated cost** based on the user-selected charging mode.

The available charging modes are:

- **Eco** (lowest power, cheapest price)
- **Smart** (medium power, medium price)
- **Rapid** (highest power, highest price)

---

### What I Did

#### Backend

- Added a new GraphQL query:

```graphql
ChargeEstimates(id: String!, rate: Int!): ChargeEstimates
````

* Parameters:

  * `id`: charger or vehicle ID
  * `rate`: price in cents per kWh (e.g., 25 for 25 cents/kWh)

* Returns:

  * `estimatedPrice`: total estimated cost to fully charge the battery
  * `estimatedTimeHours`: total estimated charging time in hours

---

#### Mathematical Calculations

1. **Calculate remaining energy to be charged (in kWh):**

$$
remaining\_kWh = maxBatteryCapacity - currentBatteryLevel
$$

2. **Estimate charging power (in kW):**

Since power was not explicitly provided for each mode, I made a reasonable assumption that power is proportional to the price rate:

$$
power\_kW = \frac{rate \ (in \ cents)}{10}
$$

For example:

| Mode  | Rate (cents/kWh) | Estimated Power (kW) |
| ----- | ---------------- | -------------------- |
| Eco   | 25               | 2.5                  |
| Smart | 30               | 3.0                  |
| Rapid | 40               | 4.0                  |

3. **Calculate estimated charging time (in hours):**

$$
estimatedTimeHours = \frac{remaining\_kWh}{\min(power\_kW, maxChargerPower)}
$$

* `maxChargerPower` is the maximum power the charger can deliver (provided in the specifications).

4. **Calculate estimated cost (in dollars):**

$$
estimatedPrice = \frac{remaining\_kWh \times rate}{100}
$$

* Divided by 100 to convert cents to dollars.

---

#### Frontend

* Created a React component called `ChargeRateController` that:

  * Shows the current battery percentage using a circular indicator.
  * Allows switching between the three charging modes (Eco, Smart, Rapid).
  * On mode change, calls the GraphQL query with the corresponding rate.
  * Dynamically displays the estimated cost and time to the user.

---

#### Integration

* The `ChargeRateController` component is integrated into the main page.
* It displays the estimates for a given charger identified by its `id`.

---

## Conclusion

This first task enables a simple and effective estimation of charging time and cost based on a reasonable assumption linking power to price.
The frontend provides a clear UI for selecting the mode and seeing real-time estimates.

---


