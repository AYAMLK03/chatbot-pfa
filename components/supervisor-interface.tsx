"use client"

import { useState } from "react"
import {
  Package,
  AlertTriangle,
  TrendingUp,
  ShoppingCart,
  Bell,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  MoreHorizontal,
  Clock,
  Truck,
  MessageCircle,
  BarChart3,
  Users,
  Calendar,
  Download,
  RefreshCw,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface SupervisorInterfaceProps {
  supervisorName: string
  supervisorId: string
  onLogout: () => void
}

export default function SupervisorInterface({ supervisorName, supervisorId, onLogout }: SupervisorInterfaceProps) {
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    {
      type: "bot",
      message: `Bonjour ${supervisorName} ! Je suis votre assistant IA pour la gestion de stock. Comment puis-je vous aider aujourd'hui ?`,
      timestamp: new Date(),
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [notifications, setNotifications] = useState(3)

  // Données simulées
  const stockData = [
    {
      id: 1,
      name: "Ordinateur Portable Dell XPS 13",
      category: "Électronique",
      stock: 45,
      minStock: 20,
      maxStock: 100,
      status: "En stock",

      supplier: "Dell France",
      lastUpdate: "2024-01-15",
    },
    {
      id: 2,
      name: "Chaise de Bureau Ergonomique",
      category: "Mobilier",
      stock: 12,
      minStock: 15,
      maxStock: 50,
      status: "Stock faible",

      supplier: "Office Depot",
      lastUpdate: "2024-01-14",
    },
    {
      id: 3,
      name: "Imprimante HP LaserJet Pro",
      category: "Électronique",
      stock: 8,
      minStock: 10,
      maxStock: 30,
      status: "Stock critique",

      supplier: "HP France",
      lastUpdate: "2024-01-13",
    },
    {
      id: 4,
      name: "Carte Graphique GTX",
      category: "Fournitures",
      stock: 20,
      minStock: 50,
      maxStock: 100,
      status: "En stock",

      supplier: "Papeterie Plus",
      lastUpdate: "2024-01-15",
    },
    {
      id: 5,
      name: "Écran 24 pouces Samsung",
      category: "Électronique",
      stock: 25,
      minStock: 15,
      maxStock: 60,
      status: "En stock",
      supplier: "Samsung France",
      lastUpdate: "2024-01-14",
    },
  ]

  const ordersData = [
    {
      id: "CMD001",
      client: "Asma Ait Nasser",
      date: "2024-01-15",
      status: "Livré",

      items: 5,
      priority: "Normal",
    },
    {
      id: "CMD002",
      client: "Maha Rhaouate",
      date: "2024-01-14",
      status: "En transit",

      items: 3,
      priority: "Urgent",
    },
    {
      id: "CMD003",
      client: "Omayma Yousfi",
      date: "2024-01-13",
      status: "En préparation",
      total: "890€",
      items: 2,
      priority: "Normal",
    },
    {
      id: "CMD004",
      client: "Meryem Aboutaleb",
      date: "2024-01-12",
      status: "En attente",

      items: 8,
      priority: "Élevé",
    },
  ]

  const alertsData = [
    {
      id: 1,
      type: "stock_critique",
      message: "Imprimante HP LaserJet Pro - Stock critique (8 unités)",
      timestamp: "Il y a 2 heures",
      severity: "high",
    },
    {
      id: 2,
      type: "stock_faible",
      message: "Chaise de Bureau Ergonomique - Stock faible (12 unités)",
      timestamp: "Il y a 4 heures",
      severity: "medium",
    },
    {
      id: 3,
      type: "commande_urgente",
      message: "Nouvelle commande urgente CMD002 - Société XYZ",
      timestamp: "Il y a 6 heures",
      severity: "high",
    },
  ]

  const sendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = {
        type: "user",
        message: newMessage,
        timestamp: new Date(),
      }
      setChatMessages([...chatMessages, userMessage])

      // Simulation de réponse IA
      setTimeout(() => {
        let botResponse = ""
        const lowerMessage = newMessage.toLowerCase()

        if (lowerMessage.includes("stock") || lowerMessage.includes("inventaire")) {
          const criticalItems = stockData.filter((item) => item.status === "Stock critique").length
          const lowItems = stockData.filter((item) => item.status === "Stock faible").length
          botResponse = `Actuellement, vous avez ${criticalItems} article(s) en stock critique et ${lowItems} en stock faible. Voulez-vous que je vous aide à passer des commandes de réapprovisionnement ?`
        } else if (lowerMessage.includes("commande")) {
          const pendingOrders = ordersData.filter((order) => order.status !== "Livré").length
          botResponse = `Vous avez ${pendingOrders} commandes en cours de traitement. La commande la plus urgente est CMD002 de Société XYZ.`
        } else if (lowerMessage.includes("alerte")) {
          botResponse = `Vous avez ${alertsData.length} alertes actives. La plus récente concerne le stock critique de l'Imprimante HP LaserJet Pro.`
        } else if (lowerMessage.includes("rapport") || lowerMessage.includes("analyse")) {
          botResponse =
            "Je peux générer un rapport détaillé sur vos stocks, ventes, ou commandes. Quel type de rapport souhaitez-vous ?"
        } else {
          botResponse =
            "Je peux vous aider avec la gestion des stocks, le suivi des commandes, les alertes de réapprovisionnement, et la génération de rapports. Que souhaitez-vous faire ?"
        }

        setChatMessages((prev) => [
          ...prev,
          {
            type: "bot",
            message: botResponse,
            timestamp: new Date(),
          },
        ])
      }, 1000)

      setNewMessage("")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En stock":
        return "bg-green-100 text-green-800"
      case "Stock faible":
        return "bg-yellow-100 text-yellow-800"
      case "Stock critique":
        return "bg-red-100 text-red-800"
      case "Livré":
        return "bg-green-100 text-green-800"
      case "En transit":
        return "bg-blue-100 text-blue-800"
      case "En préparation":
        return "bg-orange-100 text-orange-800"
      case "En attente":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return "bg-red-100 text-red-800"
      case "Élevé":
        return "bg-orange-100 text-orange-800"
      case "Normal":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAlertSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "border-red-500 bg-red-50"
      case "medium":
        return "border-yellow-500 bg-yellow-50"
      case "low":
        return "border-blue-500 bg-blue-50"
      default:
        return "border-gray-500 bg-gray-50"
    }
  }

  const stockPercentage = (current: number, max: number) => (current / max) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">StockAssist Pro</h1>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Superviseur
            </Badge>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Rechercher produits, commandes..." className="pl-10 w-80" />
            </div>

            {/*<Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </Button>*/}

            <Button onClick={() => setChatOpen(!chatOpen)} className="bg-blue-600 hover:bg-blue-700">
              <MessageCircle className="h-4 w-4 mr-2" />
              Assistant IA
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {supervisorName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{supervisorName}</p>
                    <p className="text-xs leading-none text-muted-foreground">ID: {supervisorId}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Users className="h-4 w-4 mr-2" />
                  Profil
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="h-4 w-4 mr-2" />
                  Exporter données
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>Déconnexion</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Chat Assistant Sidebar */}
        {chatOpen && (
          <div className="w-80 bg-white border-r border-gray-200 h-screen overflow-hidden fixed right-0 z-30 shadow-lg">
            <div className="p-4 border-b border-gray-200 bg-blue-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900">Assistant IA</h3>
                    <p className="text-xs text-blue-600">En ligne</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setChatOpen(false)}>
                  ×
                </Button>
              </div>
            </div>

            <div className="flex-1 p-4 space-y-4 h-96 overflow-y-auto">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div className="flex items-start space-x-2 max-w-xs">
                    {msg.type === "bot" && (
                      <Avatar className="h-6 w-6 mt-1">
                        <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">IA</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`rounded-lg p-3 ${
                        msg.type === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-800 border border-gray-200"
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {msg.timestamp.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                    {msg.type === "user" && (
                      <Avatar className="h-6 w-6 mt-1">
                        <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                          {supervisorName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex space-x-2">
                <Input
                  placeholder="Tapez votre message..."
                  className="flex-1"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                />
                <Button size="icon" onClick={sendMessage} disabled={!newMessage.trim()}>
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setNewMessage("État des stocks critiques")}
                >
                  Stocks critiques
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setNewMessage("Commandes en attente")}
                >
                  Commandes
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setNewMessage("Générer un rapport")}
                >
                  Rapport
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className={`flex-1 p-6 ${chatOpen ? "mr-80" : ""} transition-all duration-300`}>
          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Produits</CardTitle>
                <Package className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{stockData.length}</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3 inline mr-1" />
                  +12% ce mois
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Commandes Actives</CardTitle>
                <ShoppingCart className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{ordersData.length}</div>
                <p className="text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 inline mr-1" />3 en attente
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Alertes Actives</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{alertsData.length}</div>
                <p className="text-xs text-muted-foreground">
                  <AlertTriangle className="h-3 w-3 inline mr-1" />2 critiques
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Valeur Stock</CardTitle>
                <BarChart3 className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">45,231€</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3 inline mr-1" />
                  +8% ce mois
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Alerts Section */}
          {alertsData.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                Alertes Importantes
              </h3>
              <div className="space-y-2">
                {alertsData.map((alert) => (
                  <Alert key={alert.id} className={getAlertSeverityColor(alert.severity)}>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle className="text-sm font-medium">{alert.message}</AlertTitle>
                    <AlertDescription className="text-xs text-gray-600">{alert.timestamp}</AlertDescription>
                  </Alert>
                ))}
              </div>
            </div>
          )}

          {/* Main Tabs */}


            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Stock Status Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Package className="h-5 w-5 text-blue-500 mr-2" />
                      État des Stocks
                    </CardTitle>
                    <CardDescription>Aperçu rapide de votre inventaire</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {stockData.slice(0, 4).map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{item.name}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Progress value={stockPercentage(item.stock, item.maxStock)} className="w-20 h-2" />
                              <span className="text-xs text-gray-600">
                                {item.stock}/{item.maxStock}
                              </span>
                            </div>
                          </div>
                          <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Orders */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <ShoppingCart className="h-5 w-5 text-green-500 mr-2" />
                      Commandes Récentes
                    </CardTitle>
                    <CardDescription>Dernières commandes reçues</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {ordersData.map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-sm">{order.id}</p>
                            <p className="text-xs text-gray-600">{order.client}</p>
                            <p className="text-xs text-gray-500">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-sm">{order.total}</p>
                            <div className="flex space-x-1 mt-1">
                              <Badge className={getStatusColor(order.status)} variant="outline">
                                {order.status}
                              </Badge>
                              <Badge className={getPriorityColor(order.priority)} variant="outline">
                                {order.priority}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="stock" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Gestion des Stocks</CardTitle>
                      <CardDescription>Gérez votre inventaire et surveillez les niveaux de stock</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Actualiser
                      </Button>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter Produit
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input placeholder="Rechercher un produit..." className="pl-10" />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Produit</TableHead>
                          <TableHead>Catégorie</TableHead>
                          <TableHead>Stock</TableHead>


                          <TableHead>Statut</TableHead>

                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {stockData.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <span className="font-medium">{item.stock}</span>
                                <Progress value={stockPercentage(item.stock, item.maxStock)} className="w-16 h-2" />
                                <span className="text-xs text-gray-500">/{item.maxStock}</span>
                              </div>
                            </TableCell>

                            <TableCell className="text-sm">{item.supplier}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Réapprovisionner
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
                                    <AlertTriangle className="h-4 w-4 mr-2" />
                                    Supprimer
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Gestion des Commandes</CardTitle>
                      <CardDescription>Suivez et gérez toutes les commandes</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline">
                        <Calendar className="h-4 w-4 mr-2" />
                        Filtrer par date
                      </Button>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Nouvelle Commande
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>N° Commande</TableHead>
                          <TableHead>Client</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Articles</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {ordersData.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{order.client}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>{order.items} articles</TableCell>
                            <TableCell className="font-medium">{order.total}</TableCell>
                            <TableCell>
                              <Badge className={getPriorityColor(order.priority)}>{order.priority}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Analyse des Ventes</CardTitle>
                    <CardDescription>Performance des ventes sur les 30 derniers jours</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border-2 border-dashed border-blue-200">
                      <div className="text-center">
                        <BarChart3 className="h-12 w-12 text-blue-400 mx-auto mb-2" />
                        <p className="text-blue-600 font-medium">Graphique des ventes</p>
                        <p className="text-sm text-blue-500">Données en temps réel</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Rotation des Stocks</CardTitle>
                    <CardDescription>Produits les plus et moins vendus</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 rounded-lg border-2 border-dashed border-green-200">
                      <div className="text-center">
                        <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-2" />
                        <p className="text-green-600 font-medium">Analyse de rotation</p>
                        <p className="text-sm text-green-500">Tendances du marché</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

          <TabsContent value="reports" className="space-y-4">
              <Card>
                {/*<CardHeader>
                  <CardTitle>Génération de Rapports</CardTitle>
                  <CardDescription>Créez et téléchargez des rapports personnalisés</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="text-center">
                        <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <h4 className="font-semibold">Rapport de Stock</h4>
                        <p className="text-sm text-gray-600 mb-3">État complet de l'inventaire</p>
                        <Button size="sm" className="w-full">
                          <Download className="h-4 w-4 mr-2" />
                          Générer
                        </Button>
                      </div>
                    </Card>

                    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="text-center">
                        <ShoppingCart className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <h4 className="font-semibold">Rapport de Ventes</h4>
                        <p className="text-sm text-gray-600 mb-3">Analyse des performances</p>
                        <Button size="sm" className="w-full">
                          <Download className="h-4 w-4 mr-2" />
                          Générer
                        </Button>
                      </div>
                    </Card>

                    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="text-center">
                        <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                        <h4 className="font-semibold">Rapport d'Alertes</h4>
                        <p className="text-sm text-gray-600 mb-3">Historique des alertes</p>
                        <Button size="sm" className="w-full">
                          <Download className="h-4 w-4 mr-2" />
                          Générer
                        </Button>
                      </div>
                    </Card>
                  </div>
                </CardContent>*/}
              </Card>
            </TabsContent>
        </div>
      </div>
    </div>

  )
}
