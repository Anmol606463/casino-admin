import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Monitor, 
  Wallet, 
  History, 
  Bell, 
  Search, 
  ChevronRight,
  TrendingUp,
  Coins,
  ShieldCheck,
  UserPlus,
  Settings,
  Table as TableIcon,
  Percent,
  CreditCard,
  BarChart3,
  Lock,
  Activity,
  Eye,
  Clock,
  Menu,
  X,
  ChevronLeft
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

// --- RICH DUMMY DATA ---
const revenueData = [
  { name: 'Mon', revenue: 4200, rake: 450 },
  { name: 'Tue', revenue: 3800, rake: 380 },
  { name: 'Wed', revenue: 5100, rake: 520 },
  { name: 'Thu', revenue: 4780, rake: 480 },
  { name: 'Fri', revenue: 6890, rake: 710 },
  { name: 'Sat', revenue: 9390, rake: 980 },
  { name: 'Sun', revenue: 8490, rake: 890 },
];

const agentEarningsData = [
  { name: 'Mon', earnings: 1200 },
  { name: 'Tue', earnings: 1500 },
  { name: 'Wed', earnings: 1100 },
  { name: 'Thu', earnings: 1800 },
  { name: 'Fri', earnings: 2400 },
  { name: 'Sat', earnings: 3100 },
  { name: 'Sun', earnings: 2800 },
];

const COLORS = ['#d4af37', '#10b981', '#ef4444', '#6366f1'];

const DUMMY_USERS = [
    { id: 1, name: "Alexander Pierce", email: "alex.p@casinoroyale.com", role: "Super Admin", balance: "$1,240,000", status: "Active", lastSeen: "Online" },
    { id: 2, name: "Sarah Valencia", email: "s.valencia@agent.net", role: "Agent", balance: "$85,400", status: "Active", lastSeen: "2 mins ago" },
    { id: 3, name: "Mike Ross", email: "m.ross@pearson.com", role: "Agent", balance: "$12,300", status: "Inactive", lastSeen: "3 days ago" },
    { id: 4, name: "Jessica Pearson", email: "jessica@legal.com", role: "Admin", balance: "$450,000", status: "Active", lastSeen: "1 hour ago" },
    { id: 5, name: "Harvey Specter", email: "harvey@win.com", role: "Agent", balance: "$240,000", status: "Blocked", lastSeen: "1 month ago" },
];

const DUMMY_PLAYERS = [
    { name: "Alex 'The Ace'", contact: "+1 234 567 890", winLoss: "+$4,250", rake: "$840", earn: "$210", status: "In Game", lastWin: "+$120", table: "Poker VIP #04" },
    { name: "Sarah Connor", contact: "+1 987 654 321", winLoss: "-$1,200", rake: "$1,120", earn: "$280", status: "Active", lastWin: "-$50", table: "Blackjack #02" },
    { name: "KingHigh88", contact: "Hidden", winLoss: "+$18,900", rake: "$4,400", earn: "$1,100", status: "Pending Approval", lastWin: "+$2,100", table: "N/A" },
    { name: "Jack Sparrow", contact: "+44 7700 9000", winLoss: "$0", rake: "$0", earn: "$0", status: "Inactive", lastWin: "$0", table: "N/A" },
    { name: "Lady Luck", contact: "+1 555 0199", winLoss: "+$1,400", rake: "$320", earn: "$80", status: "In Game", lastWin: "+$450", table: "Roulette #01" },
];

const DUMMY_TRANSACTIONS = [
    { id: "TX9901", user: "Alex 'The Ace'", type: "Deposit", amount: "+$500.00", date: "2 mins ago", status: "Success" },
    { id: "TX9902", user: "Sarah Connor", type: "Withdraw", amount: "-$200.00", date: "15 mins ago", status: "Pending" },
    { id: "TX9903", user: "KingHigh88", type: "Game Win", amount: "+$2,100.00", date: "1 hour ago", status: "Success" },
    { id: "TX9904", user: "Lady Luck", type: "Deposit", amount: "+$1,000.00", date: "3 hours ago", status: "Success" },
];

const DUMMY_NOTIFICATIONS = [
    { id: 1, title: "Large Withdrawal Request", message: "User 'Harvey Specter' requested a $50,000 withdrawal.", time: "5 mins ago", type: "alert", unread: true },
    { id: 2, title: "New Player Registration", message: "A new player has joined via Agent Sarah Valencia.", time: "12 mins ago", type: "info", unread: true },
    { id: 3, title: "System Maintenance", message: "Scheduled maintenance in 2 hours for server upgrade.", time: "1 hour ago", type: "warning", unread: false },
    { id: 4, title: "Security Alert", message: "Multiple failed login attempts from IP 192.168.1.102", time: "3 hours ago", type: "critical", unread: false },
];

// --- Reusable UI Components ---

const SidebarItem = ({ icon: Icon, label, active, onClick, badge, isCollapsed }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center transition-all duration-300 group ${
      active ? 'nav-item-active' : 'text-slate-500 hover:text-casino-gold hover:bg-white/5'
    } ${isCollapsed ? 'justify-center py-4 px-0' : 'justify-between py-3 px-6'}`}
    title={isCollapsed ? label : ''}
  >
    <div className={`flex items-center ${isCollapsed ? 'justify-center w-full' : 'gap-4'}`}>
      <Icon size={isCollapsed ? 22 : 18} className={active ? 'text-casino-gold' : 'group-hover:text-casino-gold'} />
      {!isCollapsed && <span className="font-medium text-sm tracking-wide whitespace-nowrap">{label}</span>}
    </div>
    {!isCollapsed && badge && (
      <span className="bg-casino-gold/20 text-casino-gold text-[10px] px-2 py-0.5 rounded-full font-bold">
        {badge}
      </span>
    )}
  </button>
);

const StatCard = ({ title, value, trend, icon: Icon, color = "gold" }: any) => (
  <div className="glass-card flex flex-col gap-2 relative overflow-hidden group">
    <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Icon size={80} />
    </div>
    <div className="flex justify-between items-start relative z-10">
      <div className={`p-2 rounded-lg ${color === 'gold' ? 'bg-casino-gold/10 text-casino-gold' : color === 'blue' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-emerald-500/10 text-emerald-500'}`}>
        <Icon size={20} />
      </div>
      <span className={`text-xs font-bold ${trend.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
        {trend}
      </span>
    </div>
    <h3 className="text-slate-500 text-xs uppercase tracking-widest mt-2 relative z-10">{title}</h3>
    <span className="text-2xl font-serif text-casino-gold-light relative z-10">{value}</span>
  </div>
);

// --- Admin Panel Components ---

const AdminDashboard = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      <StatCard title="Total Platform Revenue" value="$4,850,200" trend="+15.8%" icon={TrendingUp} />
      <StatCard title="Active Tables" value="42" trend="312 Online" icon={Monitor} color="emerald" />
      <StatCard title="24h Rake Volume" value="$128,420" trend="+12.2%" icon={Coins} />
      <StatCard title="Pending Settlements" value="26" trend="$182.1K" icon={CreditCard} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 glass-card">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-lg font-serif text-white">Platform Revenue & Rake Trends</h3>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-white/5 rounded-md text-[10px] text-slate-400">7D</button>
            <button className="px-3 py-1 bg-casino-gold/20 rounded-md text-[10px] text-casino-gold">30D</button>
          </div>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#d4af37" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f3d26', border: '1px solid #d4af3733', borderRadius: '12px' }}
                itemStyle={{ color: '#d4af37' }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#d4af37" fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="glass-card">
        <h3 className="text-lg font-serif text-white mb-6">Live Game Activity</h3>
        <div className="space-y-4">
            {[
                { name: "High Stakes Poker #01", players: "9/9", pot: "$42,250", status: "Active" },
                { name: "Blackjack Private #05", players: "4/5", pot: "$12,800", status: "Active" },
                { name: "European Roulette #02", players: "18/20", pot: "$3,150", status: "Active" },
                { name: "Baccarat Elite #01", players: "2/8", pot: "$8,500", status: "Waiting" },
            ].map((game, i) => (
                <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/5 flex flex-col gap-2 group hover:border-casino-gold/30 transition-all cursor-pointer">
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-200">{game.name}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${game.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                            {game.status}
                        </span>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500">
                        <span>Players: {game.players}</span>
                        <span className="text-casino-gold">Pot: {game.pot}</span>
                    </div>
                </div>
            ))}
        </div>
        <button className="w-full mt-6 py-2 border border-casino-gold/30 rounded-lg text-xs text-casino-gold hover:bg-casino-gold/10 transition-all">
            Open Control Center
        </button>
      </div>
    </div>
  </div>
);

const UserManagement = () => (
    <div className="glass-card">
        <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-serif text-white">System User Directory</h3>
            <div className="flex gap-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                    <input type="text" placeholder="Filter by name, email..." className="bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-xs outline-none focus:border-casino-gold/50" />
                </div>
                <button className="btn-gold flex items-center gap-2 text-xs py-2 px-6">
                    <UserPlus size={14} /> Create Account
                </button>
            </div>
        </div>
        <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full min-w-[800px]">
                <thead>
                    <tr className="text-left border-b border-white/10">
                        <th className="pb-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Identity</th>
                        <th className="pb-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Level</th>
                        <th className="pb-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Balance</th>
                        <th className="pb-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                        <th className="pb-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {DUMMY_USERS.map((user) => (
                        <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                            <td className="py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-casino-gold/20 flex items-center justify-center text-casino-gold font-bold text-xs uppercase">{user.name.charAt(0)}</div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-200">{user.name}</p>
                                        <p className="text-[10px] text-slate-500">{user.email}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="py-4 text-xs text-slate-400">{user.role}</td>
                            <td className="py-4 text-xs font-bold text-casino-gold-light">{user.balance}</td>
                            <td className="py-4">
                                <div className="flex flex-col gap-1">
                                    <span className={`w-fit text-[10px] px-2 py-0.5 rounded-full font-bold ${user.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : user.status === 'Blocked' ? 'bg-rose-500/20 text-rose-400' : 'bg-white/10 text-slate-500'}`}>
                                        {user.status}
                                    </span>
                                    <span className="text-[9px] text-slate-600 ml-1">{user.lastSeen}</span>
                                </div>
                            </td>
                            <td className="py-4 text-right">
                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 hover:bg-white/10 rounded-lg text-casino-gold" title="Edit"><Settings size={14} /></button>
                                    <button className="p-2 hover:bg-white/10 rounded-lg text-rose-400" title="Block"><Lock size={14} /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

// --- Agent Panel Components ---

const AgentDashboard = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      <StatCard title="My Player Pool" value="156" trend="+12" icon={Users} color="blue" />
      <StatCard title="Gross Earnings" value="$12,450" trend="+5.2%" icon={TrendingUp} />
      <StatCard title="Total Rake (Pool)" value="$4,120" trend="+14%" icon={Coins} />
      <StatCard title="Player Win Rate" value="68.4%" trend="Healthy" icon={Activity} color="emerald" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 glass-card">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-lg font-serif text-white">Commission Trends</h3>
          <div className="flex gap-2 text-[10px]">
            <span className="text-slate-500">Net Profit Breakdown</span>
          </div>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={agentEarningsData}>
              <defs>
                <linearGradient id="colorEarn" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f3d26', border: '1px solid #6366f133', borderRadius: '12px' }}
                itemStyle={{ color: '#818cf8' }}
              />
              <Area type="monotone" dataKey="earnings" stroke="#6366f1" fillOpacity={1} fill="url(#colorEarn)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="glass-card">
        <h3 className="text-lg font-serif text-white mb-6">Player Distribution</h3>
        <div className="flex flex-col gap-6">
            <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={[
                                { name: 'Active', value: 85 },
                                { name: 'In Game', value: 34 },
                                { name: 'Inactive', value: 37 },
                            ]}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {COLORS.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#0f3d26', border: 'none', borderRadius: '8px' }} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-casino-gold"></div>
                        <span className="text-slate-400">Online/Active</span>
                    </div>
                    <span className="text-white font-bold">85</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        <span className="text-slate-400">Currently Playing</span>
                    </div>
                    <span className="text-white font-bold">34</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                        <span className="text-slate-400">Idle/Inactive</span>
                    </div>
                    <span className="text-white font-bold">37</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
);

const PlayerManagement = () => (
    <div className="glass-card">
        <div className="flex justify-between items-center mb-8">
            <div>
                <h3 className="text-xl font-serif text-white">Network Management</h3>
                <p className="text-xs text-slate-500 mt-1">Real-time performance metrics for your registered players.</p>
            </div>
            <div className="flex gap-4">
                <button className="btn-gold flex items-center gap-2 text-xs py-2 px-6">
                    <UserPlus size={14} /> Add New Player
                </button>
            </div>
        </div>
        <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full min-w-[800px]">
                <thead>
                    <tr className="text-left border-b border-white/10">
                        <th className="pb-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Player Identity</th>
                        <th className="pb-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Current State</th>
                        <th className="pb-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Performance</th>
                        <th className="pb-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Commission</th>
                        <th className="pb-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right">Perspective</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {DUMMY_PLAYERS.map((player, i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors group">
                            <td className="py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-xs uppercase">{player.name.charAt(0)}</div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-200">{player.name}</p>
                                        <p className="text-[10px] text-slate-500">{player.contact}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="py-4">
                                <div className="flex flex-col gap-1">
                                    <span className={`w-fit text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                        player.status === 'In Game' ? 'bg-emerald-500/20 text-emerald-400' : 
                                        player.status === 'Active' ? 'bg-indigo-500/20 text-indigo-400' : 
                                        player.status === 'Pending Approval' ? 'bg-amber-500/20 text-amber-400' : 'bg-white/5 text-slate-500'
                                    }`}>
                                        {player.status}
                                    </span>
                                    {player.table !== 'N/A' && <span className="text-[9px] text-slate-600 ml-1">Table: {player.table}</span>}
                                </div>
                            </td>
                            <td className="py-4">
                                <div className="flex flex-col gap-1">
                                    <span className={`text-xs font-bold ${player.winLoss.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                                        W/L: {player.winLoss}
                                    </span>
                                    <span className="text-[9px] text-slate-600">Last: {player.lastWin}</span>
                                </div>
                            </td>
                            <td className="py-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs text-casino-gold font-bold">Earn: {player.earn}</span>
                                    <span className="text-[9px] text-slate-600">Rake: {player.rake}</span>
                                </div>
                            </td>
                            <td className="py-4 text-right">
                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-casino-gold" title="Details"><Eye size={16} /></button>
                                    <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-casino-gold" title="History"><History size={16} /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

// --- Main App Component ---

export default function App() {
  const [activePanel, setActivePanel] = useState<'admin' | 'agent'>('admin');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const renderContent = () => {
    if (activePanel === 'admin') {
      switch (activeTab) {
        case 'dashboard': return <AdminDashboard />;
        case 'users': return <UserManagement />;
        case 'history': return (
            <div className="glass-card">
                <h3 className="text-xl font-serif text-white mb-8">Platform Transaction History</h3>
                <div className="space-y-4">
                    {DUMMY_TRANSACTIONS.map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-casino-gold/20 transition-all">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${tx.type === 'Deposit' ? 'bg-emerald-500/10 text-emerald-400' : tx.type === 'Withdraw' ? 'bg-rose-500/10 text-rose-400' : 'bg-casino-gold/10 text-casino-gold'}`}>
                                    {tx.type === 'Deposit' ? 'DP' : tx.type === 'Withdraw' ? 'WD' : 'GW'}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-200">{tx.user}</p>
                                    <p className="text-[10px] text-slate-500">{tx.id} • {tx.date}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={`text-sm font-bold ${tx.amount.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>{tx.amount}</p>
                                <p className="text-[9px] text-emerald-500/60 font-bold uppercase tracking-widest">{tx.status}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
        default: return <AdminDashboard />;
      }
    } else {
      switch (activeTab) {
        case 'dashboard': return <AgentDashboard />;
        case 'players': return <PlayerManagement />;
        case 'earnings': return (
            <div className="glass-card flex flex-col items-center justify-center py-20 border-dashed border-white/10">
                <BarChart3 size={48} className="text-slate-700 mb-4" />
                <h3 className="text-lg font-serif text-slate-500">Earnings Detail Report Coming Soon</h3>
                <p className="text-xs text-slate-600 mt-2">Deep analytics for individual player rake contributions.</p>
            </div>
        );
        default: return <AgentDashboard />;
      }
    }
  };

  const adminMenu = [
    { title: "Platform", items: [{ id: 'dashboard', icon: LayoutDashboard, label: "Executive Analytics" }, { id: 'live', icon: Monitor, label: "Live Monitoring" }] },
    { title: "Operations", items: [{ id: 'users', icon: Users, label: "User Directory" }, { id: 'rake', icon: Percent, label: "Rake Configuration" }] },
    { title: "Financials", items: [{ id: 'wallets', icon: Wallet, label: "Wallet Control" }, { id: 'history', icon: History, label: "Platform Logs" }] }
  ];

  const agentMenu = [
    { title: "My Network", items: [{ id: 'dashboard', icon: LayoutDashboard, label: "Agent Overview" }, { id: 'players', icon: Users, label: "My Player Pool", badge: "156" }] },
    { title: "Financials", items: [{ id: 'earnings', icon: TrendingUp, label: "Earnings Report" }, { id: 'tx_history', icon: Clock, label: "Player Logs" }] }
  ];

  const currentMenu = activePanel === 'admin' ? adminMenu : agentMenu;

  return (
    <div className="flex min-h-screen font-sans bg-casino-deep text-slate-300">
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`bg-[#052515] border-r border-casino-gold/10 flex flex-col fixed h-full z-[70] transition-all duration-300 ease-in-out ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } ${isCollapsed ? 'w-20' : 'w-72'}`}>
        
        {/* Sidebar Header */}
        <div className={`p-8 flex items-center justify-between ${isCollapsed ? 'px-4' : ''}`}>
          {!isCollapsed && (
            <h1 className="text-2xl font-serif tracking-tighter text-casino-gold group cursor-pointer whitespace-nowrap">
              CASINO<span className="text-slate-100 font-light group-hover:text-casino-gold transition-colors">ROYALE</span>
            </h1>
          )}
          {isCollapsed && (
            <div className="w-full flex justify-center">
              <span className="text-xl font-serif text-casino-gold">CR</span>
            </div>
          )}
          
          <button 
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-2 text-slate-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Desktop Collapse Toggle */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex absolute -right-3 top-24 w-6 h-6 bg-[#052515] border border-casino-gold/20 rounded-full items-center justify-center text-casino-gold hover:bg-casino-gold hover:text-casino-deep transition-all shadow-lg z-50"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        <nav className={`flex-1 overflow-y-auto py-4 space-y-8 scrollbar-hide ${isCollapsed ? 'px-0' : 'px-6'}`}>
          {currentMenu.map((group, gi) => (
            <div key={gi}>
              {!isCollapsed && <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] mb-4">{group.title}</p>}
              {isCollapsed && <div className="h-px bg-white/5 mb-4 mx-2" />}
              <div className={`space-y-1 ${isCollapsed ? 'mx-0' : '-mx-6'}`}>
                {(group.items as any[]).map((item) => (
                  <SidebarItem 
                    key={item.id}
                    icon={item.icon} 
                    label={item.label} 
                    active={activeTab === item.id} 
                    badge={item.badge}
                    isCollapsed={isCollapsed}
                    onClick={() => {
                      setActiveTab(item.id);
                      if (window.innerWidth < 1024) setIsMobileOpen(false);
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className={`border-t border-white/5 ${isCollapsed ? 'p-2 py-6' : 'p-6'}`}>
          <div className={`bg-white/5 rounded-2xl p-4 border border-white/10 flex items-center gap-4 group cursor-pointer hover:border-casino-gold/30 transition-all ${isCollapsed ? 'justify-center p-2' : ''}`}>
            <div className={`w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center text-casino-deep font-bold shadow-gold-glow flex-shrink-0`}>
              {activePanel === 'admin' ? 'AD' : 'AG'}
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-slate-200 truncate">{activePanel === 'admin' ? 'Admin Portal' : 'Agent Suite'}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider truncate">Super Administrator</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 p-6 lg:p-10 min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent ${
        isCollapsed ? 'lg:ml-20' : 'lg:ml-72'
      }`}>
        {/* Top Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button 
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 bg-white/5 rounded-lg text-slate-300"
            >
              <Menu size={24} />
            </button>
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-casino-gold transition-colors" size={18} />
              <input 
                type="text" 
                placeholder={activePanel === 'admin' ? "Search platform accounts..." : "Search my players..."}
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-casino-gold/50 transition-all placeholder:text-slate-600"
              />
            </div>
          </div>

          <div className="flex items-center justify-between w-full md:w-auto gap-4 md:gap-8">
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 shadow-xl overflow-x-auto no-scrollbar">
                <button 
                  onClick={() => { setActivePanel('admin'); setActiveTab('dashboard'); }}
                  className={`px-4 md:px-6 py-2 rounded-lg text-[10px] font-bold tracking-widest transition-all whitespace-nowrap ${activePanel === 'admin' ? 'bg-casino-gold text-casino-deep shadow-gold-glow' : 'text-slate-400 hover:text-white'}`}
                >
                  ADMIN
                </button>
                <button 
                  onClick={() => { setActivePanel('agent'); setActiveTab('dashboard'); }}
                  className={`px-4 md:px-6 py-2 rounded-lg text-[10px] font-bold tracking-widest transition-all whitespace-nowrap ${activePanel === 'agent' ? 'bg-casino-gold text-casino-deep shadow-gold-glow' : 'text-slate-400 hover:text-white'}`}
                >
                  AGENT
                </button>
              </div>
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative p-3 rounded-full transition-all group flex-shrink-0 ${showNotifications ? 'bg-casino-gold text-casino-deep' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
              >
                <Bell size={20} className={showNotifications ? 'text-casino-deep' : 'group-hover:text-casino-gold'} />
                <span className={`absolute top-2.5 right-2.5 w-2 h-2 rounded-full shadow-[0_0_8px_rgba(244,63,94,0.5)] ${showNotifications ? 'bg-casino-deep' : 'bg-rose-500'}`}></span>
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-4 w-80 md:w-96 bg-[#0a2f1c] border border-casino-gold/20 rounded-2xl shadow-2xl z-[100] overflow-hidden"
                  >
                    <div className="p-4 border-b border-white/10 flex justify-between items-center bg-casino-gold/5">
                      <h3 className="font-serif text-casino-gold">Notifications</h3>
                      <span className="text-[10px] bg-casino-gold/20 text-casino-gold px-2 py-0.5 rounded-full font-bold">2 NEW</span>
                    </div>
                    <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                      {DUMMY_NOTIFICATIONS.map((notif) => (
                        <div key={notif.id} className={`p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group ${notif.unread ? 'bg-casino-gold/5' : ''}`}>
                          <div className="flex justify-between items-start mb-1">
                            <span className={`text-[10px] font-bold uppercase tracking-widest ${
                              notif.type === 'critical' ? 'text-rose-400' : 
                              notif.type === 'alert' ? 'text-amber-400' : 
                              'text-emerald-400'
                            }`}>
                              {notif.type}
                            </span>
                            <span className="text-[9px] text-slate-500">{notif.time}</span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-200 group-hover:text-casino-gold transition-colors">{notif.title}</h4>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed">{notif.message}</p>
                        </div>
                      ))}
                    </div>
                    <button className="w-full p-3 text-[10px] font-bold text-casino-gold hover:bg-casino-gold/10 transition-colors uppercase tracking-[0.2em]">
                      View All Activity
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* View Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activePanel}-${activeTab}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-10">
                <h2 className="text-2xl md:text-4xl font-serif text-white mb-2 tracking-tight capitalize">
                    {activeTab.replace('_', ' ')}
                </h2>
                <div className="flex items-center gap-2 text-slate-500 text-[10px] md:text-xs">
                    <span className="hover:text-casino-gold cursor-pointer transition-colors">Casino Royale</span>
                    <ChevronRight size={12} />
                    <span className="text-casino-gold/60 capitalize">{activePanel} Suite</span>
                    <ChevronRight size={12} />
                    <span className="text-slate-300">{activeTab.replace('_', ' ')}</span>
                </div>
            </div>

            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
