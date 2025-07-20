"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { FileText, Plus, Search } from "lucide-react"

const mockDocuments = [
  { id: 1, title: "Password Reset Guide", type: "FAQ", lastUpdated: "2024-01-15" },
  { id: 2, title: "Pricing Plans", type: "Product Info", lastUpdated: "2024-01-10" },
  { id: 3, title: "Account Setup", type: "Tutorial", lastUpdated: "2024-01-08" },
  { id: 4, title: "API Documentation", type: "Technical", lastUpdated: "2024-01-05" },
  { id: 5, title: "Troubleshooting", type: "Support", lastUpdated: "2024-01-03" },
]

export default function AdminPage() {
  const [documents, setDocuments] = useState(mockDocuments)
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [newDoc, setNewDoc] = useState({ title: "", content: "", type: "FAQ" })

  const filteredDocs = documents.filter((doc) => doc.title.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleAddDocument = () => {
    const doc = {
      id: documents.length + 1,
      title: newDoc.title,
      type: newDoc.type,
      lastUpdated: new Date().toISOString().split("T")[0],
    }
    setDocuments([...documents, doc])
    setNewDoc({ title: "", content: "", type: "FAQ" })
    setShowAddForm(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Knowledge Base Admin</h1>
          <p className="text-gray-600">Manage your AI assistant's knowledge base</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Document
          </Button>
        </div>

        {showAddForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Add New Document</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Document title"
                value={newDoc.title}
                onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
              />
              <select
                value={newDoc.type}
                onChange={(e) => setNewDoc({ ...newDoc, type: e.target.value })}
                className="w-full p-2 border rounded-md"
              >
                <option value="FAQ">FAQ</option>
                <option value="Tutorial">Tutorial</option>
                <option value="Product Info">Product Info</option>
                <option value="Technical">Technical</option>
                <option value="Support">Support</option>
              </select>
              <Textarea
                placeholder="Document content"
                value={newDoc.content}
                onChange={(e) => setNewDoc({ ...newDoc, content: e.target.value })}
                rows={4}
              />
              <div className="flex gap-2">
                <Button onClick={handleAddDocument}>Add Document</Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4">
          {filteredDocs.map((doc) => (
            <Card key={doc.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <div>
                      <h3 className="font-medium">{doc.title}</h3>
                      <p className="text-sm text-gray-600">Last updated: {doc.lastUpdated}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{doc.type}</Badge>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
