const views = {
    admin: `
        <div class="view-header">
            <h2 class="display-lg">Admin Global Overview</h2>
            <p class="text-muted">Platform-wide statistics and management</p>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card">
                <h3>TOTAL PLATFORM REVENUE</h3>
                <span class="value">$1,245,800.00</span>
                <div class="trend up">+12.5% vs last week</div>
            </div>
            <div class="stat-card">
                <h3>ACTIVE TABLES</h3>
                <span class="value">24</span>
                <div class="trend">142 Players Online</div>
            </div>
            <div class="stat-card">
                <h3>PENDING SETTLEMENTS</h3>
                <span class="value">18</span>
                <div class="trend urgent">$42,100.00 Unpaid</div>
            </div>
            <div class="stat-card">
                <h3>24H TX VOLUME</h3>
                <span class="value">$85,420.00</span>
                <div class="trend">4,200 Transactions</div>
            </div>
        </div>

        <div class="chart-container">
            <canvas id="revenueChart"></canvas>
        </div>

        <div class="table-header">
            <h3>Recent Player Requests</h3>
            <button class="btn-primary">View All Requests</button>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Player Name</th>
                        <th>Agent</th>
                        <th>Request Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>KingHigh88</td>
                        <td>John Sterling</td>
                        <td>Apr 25, 2026</td>
                        <td><span class="status-tag status-pending">Pending Approval</span></td>
                        <td><button class="btn-text">Approve</button></td>
                    </tr>
                    <tr>
                        <td>RoyalFlush99</td>
                        <td>Sarah V.</td>
                        <td>Apr 24, 2026</td>
                        <td><span class="status-tag status-active">Activated</span></td>
                        <td><button class="btn-text">Manage</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
    agent: `
        <div class="view-header">
            <h2 class="display-lg">Agent Portfolio Dashboard</h2>
            <p class="text-muted">Performance tracking for your registered players</p>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card">
                <h3>TOTAL PLAYERS</h3>
                <span class="value">1,248</span>
                <div class="trend">12 New this month</div>
            </div>
            <div class="stat-card">
                <h3>MY EARNINGS</h3>
                <span class="value">$12,450.00</span>
                <div class="trend up">+5.2%</div>
            </div>
            <div class="stat-card">
                <h3>RAKE GENERATED</h3>
                <span class="value">$3,120.00</span>
                <div class="trend">Across 85 active players</div>
            </div>
            <div class="stat-card">
                <h3>WIN RATE</h3>
                <span class="value">72%</span>
                <div class="trend">Average across pool</div>
            </div>
        </div>

        <div class="table-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h3>My Player Pool</h3>
            <button class="btn-primary">+ Add New Player</button>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Status</th>
                        <th>Win/Loss</th>
                        <th>Rake</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Alex "The Ace"</td>
                        <td><span class="status-tag status-active">In Game</span></td>
                        <td style="color: #00ff7f">+$450.00</td>
                        <td>$85.00</td>
                        <td><button class="btn-text">Profile</button></td>
                    </tr>
                    <tr>
                        <td>Sarah Connor</td>
                        <td><span class="status-tag status-active">Active</span></td>
                        <td style="color: #ff4500">-$120.00</td>
                        <td>$42.50</td>
                        <td><button class="btn-text">Profile</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
};

function showPanel(panelId) {
    const container = document.getElementById('dashboard-view');
    container.innerHTML = views[panelId];
    
    // Update active state in nav
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.currentTarget.classList.add('active');

    if (panelId === 'admin') {
        initCharts();
    }
}

function initCharts() {
    const ctx = document.getElementById('revenueChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Platform Revenue ($)',
                data: [12000, 19000, 15000, 25000, 22000, 30000, 35000],
                borderColor: '#d4af37',
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { labels: { color: '#d0c5af' } }
            },
            scales: {
                y: { grid: { color: 'rgba(212, 175, 55, 0.1)' }, ticks: { color: '#d0c5af' } },
                x: { grid: { display: false }, ticks: { color: '#d0c5af' } }
            }
        }
    });
}

// Initial view
window.onload = () => {
    showPanel('admin');
};
