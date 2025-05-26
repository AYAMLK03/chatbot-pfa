"use client"

import { useState } from "react"
import {
  Package,
  AlertTriangle,
  TrendingUp,
  ShoppingCart,
  Bell,
  MessageCircle,
  BarChart3,
  Download,
  RefreshCw,

  Plus,
  Truck,
  Calendar,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface SupervisorChatbotProps {
  supervisorName: string
  supervisorId: string
  onLogout: () => void
}

export default function SupervisorChatbot({ supervisorName, supervisorId, onLogout }: SupervisorChatbotProps) {
  const [chatMessages, setChatMessages] = useState([
    {
      type: "bot",
      message: `Bonjour ${supervisorName} ! Je suis votre assistant IA pour la gestion de stock. Que souhaitez-vous faire aujourd'hui ?`,
      timestamp: new Date(),
      showButtons: true,
    },
  ])
  const [currentView, setCurrentView] = useState<string | null>(null)
  const [notifications] = useState(3)

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
    },
    {
      id: 2,
      name: "Chaise de Bureau Ergonomique",
      category: "Mobilier",
      stock: 12,
      minStock: 15,
      maxStock: 50,
      status: "Stock faible",

    },
    {
      id: 3,
      name: "Imprimante HP LaserJet Pro",
      category: "Électronique",
      stock: 8,
      minStock: 10,
      maxStock: 30,
      status: "Stock critique",

    },
    {
      id: 4,
      name: "Carte Graphique GTX",
      category: "Fournitures",
      stock: 20,
      minStock: 70,
      maxStock: 100,
      status: "Stock critique",

    },
  ]

  const ordersData = [
    {
      id: "CMD001",
      client: "Asma Ait Nasser",
      date: "2024-01-15",
      status: "Livré",
      items: 5,
    },
    {
      id: "CMD002",
      client: "Maha Rhaouate",
      date: "2024-01-14",
      status: "En transit",
      items: 3,
    },
    {
      id: "CMD003",
      client: "Omayma Yousfi",
      date: "2024-01-13",
      status: "En préparation",
      items: 2,
    },
  ]

  const alertsData = [
    {
      id: 1,
      type: "stock_critique",
      message: "Imprimante HP LaserJet Pro - Stock critique (8 unités)",
      severity: "high",
    },
    {
      id: 2,
      type: "stock_faible",
      message: "Chaise de Bureau Ergonomique - Stock faible (12 unités)",
      severity: "medium",
    },
    {
      id: 3,
      type: "commande_urgente",
      message: " Carte Graphique GTX- Stock critique(20 unités)",
      severity: "high",
    },
  ]

  const handleButtonClick = (action: string) => {
    let botResponse = ""
    let newView = null

    switch (action) {
      case "stock_status":
        const criticalItems = stockData.filter((item) => item.status === "Stock critique").length
        const lowItems = stockData.filter((item) => item.status === "Stock faible").length
        botResponse = `📊 **État des Stocks**\n\nVous avez actuellement :\n• ${criticalItems} article(s) en stock critique\n• ${lowItems} article(s) en stock faible\n• ${stockData.length} produits au total\n\nVoulez-vous voir les détails ?`
        newView = "stock_details"
        break

      case "alerts":
        botResponse = `🔔 **Alertes Actives**\n\nVous avez ${alertsData.length} alertes importantes :\n• ${
          alertsData.filter((a) => a.severity === "high").length
        } critiques\n• ${alertsData.filter((a) => a.severity === "medium").length} moyennes\n\nVoulez-vous voir les détails ?`
        newView = "alerts_details"
        break

      case "orders":
        const pendingOrders = ordersData.filter((order) => order.status !== "Livré").length
        botResponse = `📦 **Commandes**\n\nVous avez :\n• ${pendingOrders} commandes en cours\n• ${ordersData.length} commandes au total\n\nVoulez-vous voir les détails ?`
        newView = "orders_details"
        break

      case "reports":
        botResponse = `📈 **Rapports Disponibles**\n\nJe peux générer :\n• Rapport de stock complet\n• Analyse des ventes\n• Rapport d'alertes\n• Statistiques mensuelles\n\nQuel rapport souhaitez-vous ?`
        newView = "reports_options"
        break

      case "restock":
        botResponse = `🔄 **Réapprovisionnement**\n\nArticles nécessitant un réapprovisionnement :\n• Imprimante HP LaserJet Pro (8/30)\n• Chaise de Bureau (12/50)\n• Carte Graphique GTX(20/100)\nVoulez-vous passer des commandes ?`
        newView = "restock_options"
        break

      case "analytics":
        botResponse = `📊 **Analyses**\n\nDonnées disponibles :\n• Tendances des ventes\n• Rotation des stocks\n• Performance des fournisseurs\n• Prévisions de demande\n\nQue souhaitez-vous analyser ?`
        newView = "analytics_options"
        break

      default:
        botResponse = "Je peux vous aider avec la gestion de votre stock. Que souhaitez-vous faire ?"
    }

    setChatMessages((prev) => [
      ...prev,
      {
        type: "bot",
        message: botResponse,
        timestamp: new Date(),
        showButtons: action === "main_menu",
      },
    ])

    setCurrentView(newView)
  }

  const showMainMenu = () => {
    setChatMessages((prev) => [
      ...prev,
      {
        type: "bot",
        message: "Que souhaitez-vous faire maintenant ?",
        timestamp: new Date(),
        showButtons: true,
      },
    ])
    setCurrentView(null)
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
      default:
        return "border-blue-500 bg-blue-50"
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
            {/*<Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </Button>*/}

            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                <AvatarFallback className="bg-blue-100 text-blue-600">
                  {supervisorName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{supervisorName}</p>
                <p className="text-xs text-gray-600">ID: {supervisorId}</p>
              </div>
            </div>

            <Button variant="outline" onClick={onLogout}>
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Chat Interface - Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Chat Messages */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto space-y-6">
              {chatMessages.map((msg, index) => (
                <div key={index} className="flex justify-start">
                  <div className="flex items-start space-x-3 max-w-3xl">
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarFallback className="bg-blue-100 text-blue-600 text-sm">IA</AvatarFallback>
                    </Avatar>
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                      <div className="whitespace-pre-line text-gray-800">{msg.message}</div>
                      <p className="text-xs text-gray-500 mt-2">
                        {msg.timestamp.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                      </p>

                      {/* Boutons d'actions principales */}
                      {msg.showButtons && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                          <Button
                            variant="outline"
                            className="h-auto p-3 flex flex-col items-center space-y-2 hover:bg-blue-50 hover:border-blue-300"
                            onClick={() => handleButtonClick("stock_status")}
                          >
                            <Package className="h-5 w-5 text-blue-600" />
                            <span className="text-sm font-medium">État des Stocks</span>
                          </Button>

                          <Button
                            variant="outline"
                            className="h-auto p-3 flex flex-col items-center space-y-2 hover:bg-red-50 hover:border-red-300"
                            onClick={() => handleButtonClick("alerts")}
                          >
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                            <span className="text-sm font-medium">Alertes</span>
                          </Button>

                          <Button
                            variant="outline"
                            className="h-auto p-3 flex flex-col items-center space-y-2 hover:bg-green-50 hover:border-green-300"
                            onClick={() => handleButtonClick("orders")}
                          >
                            <ShoppingCart className="h-5 w-5 text-green-600" />
                            <span className="text-sm font-medium">Commandes</span>
                          </Button>

                          {/*<Button
                            variant="outline"
                            className="h-auto p-3 flex flex-col items-center space-y-2 hover:bg-purple-50 hover:border-purple-300"
                            onClick={() => handleButtonClick("reports")}
                          >
                            <BarChart3 className="h-5 w-5 text-purple-600" />
                            <span className="text-sm font-medium">Rapports</span>
                          </Button>*/}

                          <Button
                            variant="outline"
                            className="h-auto p-3 flex flex-col items-center space-y-2 hover:bg-orange-50 hover:border-orange-300"
                            onClick={() => handleButtonClick("restock")}
                          >
                            <RefreshCw className="h-5 w-5 text-orange-600" />
                            <span className="text-sm font-medium">Réapprovisionner</span>
                          </Button>

                          {/*<Button
                            variant="outline"
                            className="h-auto p-3 flex flex-col items-center space-y-2 hover:bg-indigo-50 hover:border-indigo-300"
                            onClick={() => handleButtonClick("analytics")}
                          >
                            <TrendingUp className="h-5 w-5 text-indigo-600" />
                            <span className="text-sm font-medium">Analyses</span>
                          </Button>*/}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Contenu détaillé basé sur la vue actuelle */}
              {currentView && (
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  {currentView === "stock_details" && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Détails des Stocks</h3>
                        <Button variant="outline" size="sm" onClick={showMainMenu}>
                          Retour au menu
                        </Button>
                      </div>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Produit</TableHead>
                              <TableHead>Stock</TableHead>

                              <TableHead>Statut</TableHead>

                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {stockData.map((item) => (
                              <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.name}</TableCell>
                                <TableCell>
                                  <div className="flex items-center space-x-2">
                                    <span className="font-medium">{item.stock}</span>
                                    <Progress value={stockPercentage(item.stock, item.maxStock)} className="w-16 h-2" />
                                    <span className="text-xs text-gray-500">/{item.maxStock}</span>
                                  </div>
                                </TableCell>

                                <TableCell>
                                  <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                                </TableCell>

                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  )}

                  {currentView === "alerts_details" && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Alertes Actives</h3>
                        <Button variant="outline" size="sm" onClick={showMainMenu}>
                          Retour au menu
                        </Button>
                      </div>
                      <div className="space-y-3">
                        {alertsData.map((alert) => (
                          <Alert key={alert.id} className={getAlertSeverityColor(alert.severity)}>
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle className="text-sm font-medium">{alert.message}</AlertTitle>
                            <AlertDescription className="text-xs text-gray-600 mt-1">
                              <Button size="sm" className="mt-2">
                                Traiter l'alerte
                              </Button>
                            </AlertDescription>
                          </Alert>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentView === "orders_details" && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Commandes Récentes</h3>
                        <Button variant="outline" size="sm" onClick={showMainMenu}>
                          Retour au menu
                        </Button>
                      </div>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>N° Commande</TableHead>
                              <TableHead>Client</TableHead>


                              <TableHead>Statut</TableHead>

                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {ordersData.map((order) => (
                              <TableRow key={order.id}>
                                <TableCell className="font-medium">{order.id}</TableCell>
                                <TableCell>{order.client}</TableCell>
                                <TableCell>
                                  <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                                </TableCell>

                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  )}

                  {currentView === "reports_options" && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Générer un Rapport</h3>
                        <Button variant="outline" size="sm" onClick={showMainMenu}>
                          Retour au menu
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                          <div className="text-center">
                            <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                            <h4 className="font-semibold">Rapport de Stock</h4>
                            <p className="text-sm text-gray-600 mb-3">État complet de l'inventaire</p>
                            <Button size="sm" className="w-full">
                              <Download className="h-4 w-4 mr-2" />
                              Générer PDF
                            </Button>
                          </div>
                        </Card>

                        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                          <div className="text-center">
                            <BarChart3 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                            <h4 className="font-semibold">Rapport de Ventes</h4>
                            <p className="text-sm text-gray-600 mb-3">Analyse des performances</p>
                            <Button size="sm" className="w-full">
                              <Download className="h-4 w-4 mr-2" />
                              Générer PDF
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
                              Générer PDF
                            </Button>
                          </div>
                        </Card>

                        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                          <div className="text-center">
                            <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                            <h4 className="font-semibold">Rapport Mensuel</h4>
                            <p className="text-sm text-gray-600 mb-3">Synthèse du mois</p>
                            <Button size="sm" className="w-full">
                              <Download className="h-4 w-4 mr-2" />
                              Générer PDF
                            </Button>
                          </div>
                        </Card>
                      </div>
                    </div>
                  )}

                  {currentView === "restock_options" && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Réapprovisionnement</h3>
                        <Button variant="outline" size="sm" onClick={showMainMenu}>
                          Retour au menu
                        </Button>
                      </div>
                      <div className="space-y-4">
                        {stockData
                          .filter((item) => item.status !== "En stock")
                          .map((item) => (
                            <Card key={item.id} className="border-l-4 border-l-red-500">
                              <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h4 className="font-semibold text-red-700">{item.name}</h4>
                                    <p className="text-sm text-gray-600">
                                      Stock actuel: {item.stock} | Minimum requis: {item.minStock}
                                    </p>
                                    <p className="text-sm text-gray-600">Fournisseur: {item.supplier}</p>
                                  </div>
                                  <div className="flex space-x-2">
                                    <Button size="sm" variant="outline">
                                      Voir détails
                                    </Button>
                                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                                      Commander
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                      </div>
                    </div>
                  )}

                  {currentView === "analytics_options" && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Analyses Disponibles</h3>
                        <Button variant="outline" size="sm" onClick={showMainMenu}>
                          Retour au menu
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
                              Tendances des Ventes
                            </CardTitle>
                            <CardDescription>Évolution des ventes sur 30 jours</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="h-32 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border-2 border-dashed border-blue-200 flex items-center justify-center">
                              <p className="text-blue-600 font-medium">Graphique des tendances</p>
                            </div>
                            <Button className="w-full mt-3" size="sm">
                              Voir l'analyse complète
                            </Button>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <BarChart3 className="h-5 w-5 text-green-500 mr-2" />
                              Rotation des Stocks
                            </CardTitle>
                            <CardDescription>Produits les plus/moins vendus</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="h-32 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border-2 border-dashed border-green-200 flex items-center justify-center">
                              <p className="text-green-600 font-medium">Analyse de rotation</p>
                            </div>
                            <Button className="w-full mt-3" size="sm">
                              Voir l'analyse complète
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions Footer
          <div className="border-t border-gray-200 bg-white p-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Actions rapides :</span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleButtonClick("stock_status")}>
                    <Package className="h-4 w-4 mr-1" />
                    Stocks
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleButtonClick("alerts")}>
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    Alertes
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleButtonClick("orders")}>
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Commandes
                  </Button>
                  <Button variant="outline" size="sm" onClick={showMainMenu}>
                    Menu principal
                  </Button>
                </div>
              </div>
            </div>
          </div>*/}
        </div>
      </div>
    </div>
  )
}
