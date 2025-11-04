<!DOCTYPE html>
<html>
<head>
    <title>Sales Report</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #333;
            padding: 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 3px solid #3563E9;
            padding-bottom: 20px;
        }
        .header h1 {
            color: #3563E9;
            margin-bottom: 5px;
        }
        .date-range {
            color: #666;
            font-size: 14px;
        }
        .section {
            margin-bottom: 30px;
        }
        .section h2 {
            color: #3563E9;
            border-bottom: 2px solid #3563E9;
            padding-bottom: 10px;
            margin-bottom: 15px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
        }
        th {
            background-color: #3563E9;
            color: white;
            font-weight: bold;
        }
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        .metric-box {
            background-color: #f0f4ff;
            border: 2px solid #3563E9;
            border-radius: 5px;
            padding: 15px;
            margin-bottom: 15px;
        }
        .metric-label {
            font-size: 12px;
            color: #666;
            text-transform: uppercase;
        }
        .metric-value {
            font-size: 24px;
            font-weight: bold;
            color: #3563E9;
        }
        .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-top: 1px solid #ddd;
            padding-top: 20px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Entyre Sales & Service Report</h1>
        @if($start_date || $end_date)
            <div class="date-range">
                Report Period:
                {{ $start_date ? date('M d, Y', strtotime($start_date)) : 'Beginning' }} -
                {{ $end_date ? date('M d, Y', strtotime($end_date)) : 'Present' }}
            </div>
        @else
            <div class="date-range">All Time Report</div>
        @endif
    </div>

    <div class="section">
        <h2>Revenue Summary</h2>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
            <div class="metric-box">
                <div class="metric-label">Total Revenue</div>
                <div class="metric-value">MK {{ number_format($revenue['total'], 2) }}</div>
            </div>
            <div class="metric-box">
                <div class="metric-label">Services Revenue</div>
                <div class="metric-value">MK {{ number_format($revenue['services'], 2) }}</div>
            </div>
            <div class="metric-box">
                <div class="metric-label">Parts Revenue</div>
                <div class="metric-value">MK {{ number_format($revenue['parts'], 2) }}</div>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>Service Statistics</h2>
        <table>
            <tr>
                <th>Metric</th>
                <th>Value</th>
            </tr>
            <tr>
                <td>Total Completed Services</td>
                <td>{{ $services['total'] }}</td>
            </tr>
            <tr>
                <td>Total Paid Services</td>
                <td>{{ $services['paid'] }}</td>
            </tr>
        </table>
    </div>

    <div class="section">
        <h2>Popular Services</h2>
        <table>
            <thead>
                <tr>
                    <th>Service Type</th>
                    <th>Count</th>
                    <th>Revenue</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($services['popular'] as $service)
                    <tr>
                        <td>{{ $service['name'] }}</td>
                        <td>{{ $service['count'] }}</td>
                        <td>MK {{ number_format($service['revenue'], 2) }}</td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="3" style="text-align: center;">No data available</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <div class="section">
        <h2>Top Performing Mechanics</h2>
        <table>
            <thead>
                <tr>
                    <th>Mechanic Name</th>
                    <th>Services Completed</th>
                    <th>Total Earnings</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($services['busiest_mechanics'] as $mechanic)
                    <tr>
                        <td>{{ $mechanic['name'] }}</td>
                        <td>{{ $mechanic['count'] }}</td>
                        <td>MK {{ number_format($mechanic['earnings'], 2) }}</td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="3" style="text-align: center;">No data available</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <div class="section">
        <h2>Recent Transactions</h2>
        <table>
            <thead>
                <tr>
                    <th>Request #</th>
                    <th>Customer</th>
                    <th>Service Type</th>
                    <th>Mechanic</th>
                    <th>Amount</th>
                    <th>Paid Date</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($services['recent'] as $service)
                    <tr>
                        <td>{{ $service['request_number'] }}</td>
                        <td>{{ $service['customer'] }}</td>
                        <td>{{ $service['service_type'] }}</td>
                        <td>{{ $service['mechanic'] }}</td>
                        <td>MK {{ number_format($service['total_cost'], 2) }}</td>
                        <td>{{ $service['paid_at'] }}</td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="6" style="text-align: center;">No transactions available</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <div class="footer">
        Generated on {{ date('F d, Y \a\t h:i A') }}<br>
        Entyre Sales & Service System
    </div>
</body>
</html>
