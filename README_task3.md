## Task 3 – Calculate the Cheapest Time to Charge Within the Next 12 Hours (Eco Mode Optimization)

### Goal
Help users save money by calculating the cheapest 12-hour window to charge their vehicle, assuming Eco mode charging with constant power.

### What I did

#### Assumptions
- Charging power is fixed to Eco mode's max power.
- The charging session must be continuous (no breaks).
- The total amount of energy needed to fill the battery remains constant.

#### Approach
- Divided the next 12 hours into 1-hour intervals.
- For each possible start time within the 12-hour window:
  - Calculated how many hours it would take to fully charge given Eco mode power.
  - Summed up the variable tariff prices at each hour in that charging window.
  - Calculated the total cost for that window by multiplying hourly prices by the power and charge duration.
- Compared all possible start times and selected the one with the lowest total cost.

#### Output
- Returned the optimal start and end times that minimize charging cost within the next 12 hours.

### Frontend
- Displayed this recommendation to the user so they can plan their charging session to save money.
---
### Conclusion
- This task enables users to optimize their charging schedule by identifying the most cost-effective 12-hour window to charge in Eco mode, helping them save money through smart planning based on variable tariffs.

