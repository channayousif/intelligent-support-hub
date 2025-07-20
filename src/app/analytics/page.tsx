"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Ticket, TrendingUp, Users } from "lucide-react"

const mockAnalytics = {
  totalChats: 1247,
  ticketsCreated: 89,
  resolutionRate: 92,
  avgResponseTime: "2.3s",
  topQueries: [
    { query: "Password reset", count: 156 },
    { query: "Pricing information", count: 134 },
    { query: "Account setup", count: 98 },
    { query: "API documentation", count: 76 },
    { query: "Billing issues", count: 54 },
  ],
  recentTickets: [
    { id: "T-001", subject: "Cannot access dashboard", status: "open", priority: "high" },
    { id: "T-002", subject: "Feature request: Dark mode", status: "in-progress", priority: "medium" },
    { id: "T-003", subject: "Integration help needed", status: "resolved", priority: "low" },
  ],
}

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Support Analytics</h1>
          <p className="text-gray-600">Monitor your AI assistant's performance</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Chats</p>
                  <p className="text-2xl font-bold">{mockAnalytics.totalChats}</p>
                </div>
                <MessageCircle className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tickets Created</p>
                  <p className="text-2xl font-bold">{mockAnalytics.ticketsCreated}</p>
                </div>
                <Ticket className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Resolution Rate</p>
                  <p className="text-2xl font-bold">{mockAnalytics.resolutionRate}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Response Time</p>
                  <p className="text-2xl font-bold">{mockAnalytics.avgResponseTime}</p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Queries */}
          <Card>
            <CardHeader>
              <CardTitle>Top Queries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockAnalytics.topQueries.map((query, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{query.query}</span>
                    <Badge variant="secondary">{query.count}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Tickets */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockAnalytics.recentTickets.map((ticket) => (
                  <div key={ticket.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{ticket.id}</p>
                      <p className="text-xs text-gray-600">{ticket.subject}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge
                        variant={
                          ticket.priority === "high"
                            ? "destructive"
                            : ticket.priority === "medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {ticket.priority}
                      </Badge>
                      <Badge variant={ticket.status === "resolved" ? "default" : "secondary"}>{ticket.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
