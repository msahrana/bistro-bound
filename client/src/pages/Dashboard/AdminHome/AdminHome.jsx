import useAuth from "../../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure/useAxiosSecure";
import {useQuery} from "@tanstack/react-query";
import {FaDollarSign, FaUsers} from "react-icons/fa6";
import {CiDeliveryTruck} from "react-icons/ci";
import {FaBook} from "react-icons/fa";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Legend,
} from "recharts";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red"];

const AdminHome = () => {
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();

  const {data: stats = []} = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const {data} = await axiosSecure.get("/admin-stats");
      return data;
    },
  });

  const {data: chartData} = useQuery({
    queryKey: ["order-stats"],
    queryFn: async () => {
      const {data} = await axiosSecure.get("/order-stats");
      return data;
    },
    initialData: [],
  });

  /* custom shape for bar chart */
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };
  const TriangleBar = (props) => {
    const {fill, x, y, width, height} = props;
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  /* custom shape for pie chart */
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const PieChartData = chartData.map((data) => {
    return {name: data.category, value: data.revenue};
  });

  return (
    <div>
      {/* salutation */}
      <h1 className="text-3xl ml-5 mt-5">
        <span className="text-green-400">Hi, WelCome </span>
        {user?.displayName ? user.displayName : "Back!"}
      </h1>

      {/* stats */}
      <div className="stats shadow mt-5 mx-5 md:w-[97%]">
        <div className="stat bg-gradient-to-r from-[#BB34F5] to-[#FCDBFF]">
          <div className="stat-figure text-secondary">
            <FaDollarSign className="text-4xl" />
          </div>
          <div className="stat-title text-2xl">Revenue</div>
          <div className="stat-value">${stats.revenue}</div>
          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>

        <div className="stat bg-gradient-to-r from-[#D3A256] to-[#FDE8C0]">
          <div className="stat-figure text-secondary">
            <FaUsers className="text-4xl" />
          </div>
          <div className="stat-title text-2xl">Users</div>
          <div className="stat-value">{stats.users}</div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
        </div>

        <div className="stat bg-gradient-to-r from-[#6AAEFF] to-[#B6F7FF]">
          <div className="stat-figure text-secondary">
            <FaBook className="text-4xl" />
          </div>
          <div className="stat-title text-2xl">Menu Items</div>
          <div className="stat-value">{stats.menuItems}</div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
        </div>

        <div className="stat bg-gradient-to-r from-[#FE4880] to-[#FECDE9]">
          <div className="stat-figure text-secondary">
            <CiDeliveryTruck className="text-4xl" />
          </div>
          <div className="stat-title text-2xl">Orders</div>
          <div className="stat-value">{stats.orders}</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div>

      {/* chart */}
      <div className="flex flex-col md:flex-row gap-5 mt-10">
        <div className="w-1/2">
          {/* bar chart */}
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Bar
              dataKey="quantity"
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{position: "top"}}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
              ))}
            </Bar>
          </BarChart>
        </div>
        <div className="w-1/2">
          {/* pie chart */}
          <PieChart width={400} height={400}>
            <Pie
              data={PieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {PieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend></Legend>
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
