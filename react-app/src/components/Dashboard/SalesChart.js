import "./SalesChart.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSalesThunk } from "../../store/restaurants";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { formatCurrentDateTime } from "../../utils/helper-functions";

function SalesChart({ restaurantId }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  let sales = useSelector((state) =>
    state.restaurants.sales ? state.restaurants.sales : []
  );
  useEffect(() => {
    if (restaurantId)
      dispatch(fetchSalesThunk(restaurantId)).then(() => setIsLoading(false));
  }, [dispatch, restaurantId]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      // Format the year and month
      const formattedYearMonth = `${data.year} / ${data.month}`;
      return (
        <div className="custom-tooltip">
          <p className="custom-tooltip1">{`Year Month: ${formattedYearMonth}`}</p>
          <p className="custom-tooltip1">{`Sales: $${data.value.toFixed(
            2
          )}`}</p>
        </div>
      );
    }
    return null;
  };

  const formatYAxisTick = (value) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return value;
  };

  const [currSales, setCurrentSales] = useState(0);
  useEffect(() => {
    if (!isLoading && sales && sales.length !== 0) {
      setCurrentSales(sales[sales.length - 1].value);
    }
  }, [isLoading]);

  const monthAbbreviations = [
    "", // Placeholder for index 0 (since months are 1-based)
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <>
      {!isLoading && (
        <div className="dash__menu-item-rating-container">
          <div className="dash_perf">
            <div className="dash_perf1">
              <div className="dash__title">Performance Snapshot</div>
              <div className="dash__subtitle">Sales over last 12 months</div>
            </div>
            <div className="dash_perf2">
              {sales && sales.length !== 0 && (
                <span className="dash__subtitle">
                  {`${monthAbbreviations[sales[sales.length - 1].month]},${
                    sales[sales.length - 1].year
                  }`}
                </span>
              )}
              <span className="dash__title"> ${currSales.toFixed(2)}</span>
              <span className="as-of">As of {formatCurrentDateTime()}</span>
            </div>
          </div>
          <div className="dash__main dash_mm">
            {(!sales || (sales && sales.length === 0)) && (
              <div className="no-data nooo">No data</div>
            )}

            <LineChart
              width={814}
              height={300}
              data={sales}
              // margin={{ left: "-20px" }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="yearMonth"
                // label={{
                //   value: "Year Month",
                //   position: "insideBottomRight",
                //   offset: -10,
                // }}
                tick={(props) => (
                  <text
                    x={props.x}
                    y={props.y}
                    dy={16}
                    fontSize={12}
                    fill="#848484" // Text color
                    textAnchor="middle" // Text alignment
                    style={{ fontSize: "12px" }} // Custom styles
                  >
                    {props.payload.value}
                  </text>
                )}
              />
              <YAxis
                dataKey="value"
                // tickFormatter={formatYAxisTick}
                // label={{
                //   value: "Dollar volume ($)",
                //   angle: -90,
                //   position: "insideLeft",
                // }}
                tick={(props) => (
                  <text
                    x={props.x}
                    y={props.y}
                    dx={-16}
                    fontSize={12}
                    fill="#848484" // Text color
                    textAnchor="middle" // Text alignment
                    style={{ fontSize: "12px" }} // Custom styles
                  >
                    {formatYAxisTick(props.payload.value)}
                  </text>
                )}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                stroke="#276EF1"
                dataKey="value"
                activeDot={{ r: 6 }}
                dot={{
                  // stroke: "red",
                  strokeWidth: 1,
                  r: 0,
                  strokeDasharray: "",
                }}
              />
            </LineChart>
          </div>
        </div>
      )}
    </>
  );
}

export default SalesChart;
