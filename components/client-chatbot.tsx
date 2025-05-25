"use client"

import { useState } from "react"
import {
  Package,
  MessageCircle,
  Star,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  Eye,
  Send,
  AlertCircle,
  HelpCircle,
  FileText,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

interface ClientChatbotProps {
  clientName: string
  orderNumber: string
  onLogout: () => void
}

export default function ClientChatbot({ clientName, orderNumber, onLogout }: ClientChatbotProps) {
  const [chatMessages, setChatMessages] = useState([
    {
      type: "bot",
      message: `Bonjour ${clientName} ! 👋\n\nJe suis votre assistant personnel pour votre commande ${orderNumber}.\n\nComment puis-je vous aider aujourd'hui ?`,
      timestamp: new Date(),
      showButtons: true,
    },
  ])
  const [currentView, setCurrentView] = useState<string | null>(null)
  const [feedbackRating, setFeedbackRating] = useState(0)
  const [feedbackComment, setFeedbackComment] = useState("")
  const [feedbackCategory, setFeedbackCategory] = useState("")

  // Données simulées pour la commande
  const orderDetails = {
    id: orderNumber,
    status: "En transit",
    orderDate: "2024-01-12",
    estimatedDelivery: "2024-01-25",
    trackingNumber: "TRK123456789",
    carrier: "DHL Express",
    total: "2,450€",
    items: [
      {
        id: 1,
        name: "Ordinateur Portable Dell XPS 13",
        quantity: 1,
        price: "1,299€",
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: 2,
        name: "Souris sans fil Logitech",
        quantity: 2,
        price: "45€",
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: 3,
        name: "Tapis de souris premium",
        quantity: 1,
        price: "25€",
        image: "/placeholder.svg?height=60&width=60",
      },
    ],
    shippingAddress: {
      name: clientName,
      street: "123 Rue de la République",
      city: "75001 Paris",
      country: "France",
      phone: "+33 1 23 45 67 89",
    },
    timeline: [
      { status: "Commande confirmée", date: "2024-01-12", time: "14:30", completed: true },
      { status: "En préparation", date: "2024-01-13", time: "09:15", completed: true },
      { status: "Expédiée", date: "2024-01-15", time: "16:45", completed: true },
      { status: "En transit", date: "2024-01-18", time: "08:20", completed: true },
      { status: "En livraison", date: "2024-01-25", time: "10:00", completed: false },
      { status: "Livrée", date: "2024-01-25", time: "18:00", completed: false },
    ],
  }

  const handleButtonClick = (action: string) => {
    let botResponse = ""
    let newView = null

    switch (action) {
      case "track_order":
        botResponse = `📦 **Suivi de votre commande ${orderNumber}**\n\n🚚 Statut actuel : **${orderDetails.status}**\n📅 Livraison prévue : **${orderDetails.estimatedDelivery}**\n📋 Numéro de suivi : **${orderDetails.trackingNumber}**\n🚛 Transporteur : **${orderDetails.carrier}**\n\nVoulez-vous voir le suivi détaillé ?`
        newView = "tracking_details"
        break

      case "order_details":
        botResponse = `📋 **Détails de votre commande**\n\n• ${orderDetails.items.length} articles commandés\n• Total : **${orderDetails.total}**\n• Date de commande : ${orderDetails.orderDate}\n• Adresse de livraison : ${orderDetails.shippingAddress.city}\n\nVoulez-vous voir le détail des articles ?`
        newView = "order_details"
        break

      case "feedback":
        botResponse = `⭐ **Votre avis nous intéresse !**\n\nVotre satisfaction est notre priorité. Partagez votre expérience pour nous aider à nous améliorer.\n\nVous pouvez évaluer :\n• La qualité du produit\n• Le service de livraison\n• Notre service client\n• Le site web`
        newView = "feedback_form"
        break

      case "support":
        botResponse = `🆘 **Support Client**\n\nNotre équipe est là pour vous aider !\n\n📞 **Téléphone** : +33 1 23 45 67 89\n📧 **Email** : support@stockassist.com\n💬 **Chat** : Disponible 24h/7j\n\n🕒 **Horaires** :\n• Lun-Ven : 9h00-18h00\n• Samedi : 9h00-12h00`
        newView = "support_options"
        break

      case "faq":
        botResponse = `❓ **Questions Fréquentes**\n\nVoici les réponses aux questions les plus courantes de nos clients.`
        newView = "faq_list"
        break

      case "problem":
        botResponse = `⚠️ **Signaler un problème**\n\nJe suis désolé d'apprendre que vous rencontrez un problème. Décrivez-moi la situation et je vous aiderai à la résoudre rapidement.\n\nTypes de problèmes courants :\n• Retard de livraison\n• Produit endommagé\n• Erreur de commande\n• Problème de facturation`
        newView = "problem_report"
        break

      default:
        botResponse = "Comment puis-je vous aider avec votre commande ?"
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
        message: "Que puis-je faire d'autre pour vous ?",
        timestamp: new Date(),
        showButtons: true,
      },
    ])
    setCurrentView(null)
  }

  const submitFeedback = () => {
    if (feedbackRating > 0) {
      const feedbackMessage = `⭐ **Feedback soumis**\n\nMerci pour votre évaluation !\n\n• Note : ${feedbackRating}/5 étoiles\n• Catégorie : ${
        feedbackCategory || "Non spécifiée"
      }\n• Commentaire : ${feedbackComment || "Aucun commentaire"}`

      setChatMessages((prev) => [
        ...prev,
        {
          type: "bot",
          message: feedbackMessage,
          timestamp: new Date(),
          showButtons: false,
        },
        {
          type: "bot",
          message:
            "🙏 Merci beaucoup pour votre retour ! Votre avis a été transmis à notre équipe et nous aidera à améliorer nos services.",
          timestamp: new Date(),
          showButtons: true,
        },
      ])

      setFeedbackRating(0)
      setFeedbackComment("")
      setFeedbackCategory("")
      setCurrentView(null)
    }
  }

  const getStatusIcon = (status: string, completed: boolean) => {
    if (!completed) return <Clock className="h-4 w-4 text-gray-400" />

    switch (status) {
      case "Commande confirmée":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "En préparation":
        return <Package className="h-4 w-4 text-blue-500" />
      case "Expédiée":
        return <Truck className="h-4 w-4 text-purple-500" />
      case "En transit":
        return <Truck className="h-4 w-4 text-orange-500" />
      case "En livraison":
        return <MapPin className="h-4 w-4 text-red-500" />
      case "Livrée":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En transit":
        return "bg-orange-100 text-orange-800"
      case "Livrée":
        return "bg-green-100 text-green-800"
      case "En préparation":
        return "bg-blue-100 text-blue-800"
      case "En livraison":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-gray-900">StockAssist Client</h1>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Client
            </Badge>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{clientName}</p>
              <p className="text-xs text-gray-600">Commande: {orderNumber}</p>
            </div>

            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
              <AvatarFallback className="bg-green-100 text-green-600">
                {clientName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <Button variant="outline" onClick={onLogout}>
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Chat Interface - Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Order Status Banner */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="max-w-4xl mx-auto">
              <Card className="border-l-4 border-l-orange-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-orange-100 rounded-full">
                        <Truck className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Votre commande est en transit</h3>
                        <p className="text-sm text-gray-600">
                          Livraison prévue le {orderDetails.estimatedDelivery} par {orderDetails.carrier}
                        </p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(orderDetails.status)} variant="outline">
                      {orderDetails.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto space-y-6">
              {chatMessages.map((msg, index) => (
                <div key={index} className="flex justify-start">
                  <div className="flex items-start space-x-3 max-w-3xl">
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarFallback className="bg-green-100 text-green-600 text-sm">IA</AvatarFallback>
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
                            onClick={() => handleButtonClick("track_order")}
                          >
                            <Truck className="h-5 w-5 text-blue-600" />
                            <span className="text-sm font-medium">Suivre ma commande</span>
                          </Button>

                          <Button
                            variant="outline"
                            className="h-auto p-3 flex flex-col items-center space-y-2 hover:bg-green-50 hover:border-green-300"
                            onClick={() => handleButtonClick("order_details")}
                          >
                            <FileText className="h-5 w-5 text-green-600" />
                            <span className="text-sm font-medium">Détails commande</span>
                          </Button>

                          <Button
                            variant="outline"
                            className="h-auto p-3 flex flex-col items-center space-y-2 hover:bg-yellow-50 hover:border-yellow-300"
                            onClick={() => handleButtonClick("feedback")}
                          >
                            <Star className="h-5 w-5 text-yellow-600" />
                            <span className="text-sm font-medium">Donner un avis</span>
                          </Button>

                          <Button
                            variant="outline"
                            className="h-auto p-3 flex flex-col items-center space-y-2 hover:bg-purple-50 hover:border-purple-300"
                            onClick={() => handleButtonClick("support")}
                          >
                            <MessageCircle className="h-5 w-5 text-purple-600" />
                            <span className="text-sm font-medium">Contacter support</span>
                          </Button>

                          <Button
                            variant="outline"
                            className="h-auto p-3 flex flex-col items-center space-y-2 hover:bg-indigo-50 hover:border-indigo-300"
                            onClick={() => handleButtonClick("faq")}
                          >
                            <HelpCircle className="h-5 w-5 text-indigo-600" />
                            <span className="text-sm font-medium">FAQ</span>
                          </Button>

                          <Button
                            variant="outline"
                            className="h-auto p-3 flex flex-col items-center space-y-2 hover:bg-red-50 hover:border-red-300"
                            onClick={() => handleButtonClick("problem")}
                          >
                            <AlertCircle className="h-5 w-5 text-red-600" />
                            <span className="text-sm font-medium">Signaler problème</span>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Contenu détaillé basé sur la vue actuelle */}
              {currentView && (
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  {currentView === "tracking_details" && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Suivi Détaillé</h3>
                        <Button variant="outline" size="sm" onClick={showMainMenu}>
                          Retour au menu
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Timeline */}
                        <div className="lg:col-span-2">
                          <div className="space-y-4">
                            {orderDetails.timeline.map((step, index) => (
                              <div key={index} className="flex items-start space-x-4">
                                <div className="flex flex-col items-center">
                                  {getStatusIcon(step.status, step.completed)}
                                  {index < orderDetails.timeline.length - 1 && (
                                    <div
                                      className={`w-0.5 h-8 mt-2 ${step.completed ? "bg-green-200" : "bg-gray-200"}`}
                                    />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <p
                                      className={`text-sm font-medium ${
                                        step.completed ? "text-gray-900" : "text-gray-500"
                                      }`}
                                    >
                                      {step.status}
                                    </p>
                                    <p className="text-xs text-gray-500">{step.time}</p>
                                  </div>
                                  <p className="text-xs text-gray-600">{step.date}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Tracking Info */}
                        <div className="space-y-4">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-base">Informations</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div>
                                <p className="text-xs text-gray-600">Numéro de suivi</p>
                                <p className="font-mono text-sm">{orderDetails.trackingNumber}</p>
                              </div>
                              <Separator />
                              <div>
                                <p className="text-xs text-gray-600">Transporteur</p>
                                <p className="text-sm font-medium">{orderDetails.carrier}</p>
                              </div>
                              <Separator />
                              <div>
                                <p className="text-xs text-gray-600">Livraison estimée</p>
                                <p className="text-sm font-medium">{orderDetails.estimatedDelivery}</p>
                              </div>
                              <Button className="w-full mt-4" variant="outline">
                                <Eye className="h-4 w-4 mr-2" />
                                Suivre sur DHL
                              </Button>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentView === "order_details" && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Détails de la Commande</h3>
                        <Button variant="outline" size="sm" onClick={showMainMenu}>
                          Retour au menu
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {orderDetails.items.map((item) => (
                          <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-md border"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{item.name}</h4>
                              <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{item.price}</p>
                            </div>
                          </div>
                        ))}
                        <Separator />
                        <div className="flex justify-between items-center text-lg font-semibold">
                          <span>Total</span>
                          <span className="text-green-600">{orderDetails.total}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentView === "feedback_form" && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Votre Avis</h3>
                        <Button variant="outline" size="sm" onClick={showMainMenu}>
                          Retour au menu
                        </Button>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">Note générale</label>
                          <div className="flex space-x-1 mb-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                onClick={() => setFeedbackRating(star)}
                                className={`text-3xl transition-colors ${
                                  star <= feedbackRating ? "text-yellow-400" : "text-gray-300 hover:text-yellow-200"
                                }`}
                              >
                                ⭐
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">Catégorie</label>
                          <select
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            value={feedbackCategory}
                            onChange={(e) => setFeedbackCategory(e.target.value)}
                          >
                            <option value="">Sélectionner une catégorie</option>
                            <option value="livraison">Livraison</option>
                            <option value="produit">Qualité du produit</option>
                            <option value="service">Service client</option>
                            <option value="site">Site web</option>
                            <option value="autre">Autre</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">Commentaire</label>
                          <Textarea
                            placeholder="Partagez votre expérience..."
                            rows={4}
                            value={feedbackComment}
                            onChange={(e) => setFeedbackComment(e.target.value)}
                          />
                        </div>

                        <div className="flex space-x-3">
                          <Button className="flex-1" onClick={submitFeedback} disabled={feedbackRating === 0}>
                            <Send className="h-4 w-4 mr-2" />
                            Envoyer mon avis
                          </Button>
                          <Button variant="outline" onClick={() => setCurrentView(null)}>
                            Annuler
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentView === "support_options" && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Contacter le Support</h3>
                        <Button variant="outline" size="sm" onClick={showMainMenu}>
                          Retour au menu
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                          <div className="text-center">
                            <Phone className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                            <h4 className="font-semibold mb-2">Téléphone</h4>
                            <p className="text-sm text-gray-600 mb-3">+33 1 23 45 67 89</p>
                            <p className="text-xs text-gray-500">Lun-Ven: 9h-18h</p>
                          </div>
                        </Card>

                        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                          <div className="text-center">
                            <Mail className="h-8 w-8 text-green-600 mx-auto mb-3" />
                            <h4 className="font-semibold mb-2">Email</h4>
                            <p className="text-sm text-gray-600 mb-3">support@stockassist.com</p>
                            <p className="text-xs text-gray-500">Réponse sous 24h</p>
                          </div>
                        </Card>

                        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer md:col-span-2">
                          <div className="text-center">
                            <MessageCircle className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                            <h4 className="font-semibold mb-2">Chat en Direct</h4>
                            <p className="text-sm text-gray-600 mb-3">Assistance immédiate avec un agent</p>
                            <Button className="w-full">Démarrer le chat</Button>
                          </div>
                        </Card>
                      </div>
                    </div>
                  )}

                  {currentView === "faq_list" && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Questions Fréquentes</h3>
                        <Button variant="outline" size="sm" onClick={showMainMenu}>
                          Retour au menu
                        </Button>
                      </div>

                      <div className="space-y-4">
                        <Card className="p-4">
                          <h4 className="font-medium mb-2">Comment suivre ma commande ?</h4>
                          <p className="text-sm text-gray-600">
                            Utilisez votre numéro de suivi dans l'onglet "Suivre ma commande" ou directement sur le site
                            du transporteur.
                          </p>
                        </Card>

                        <Card className="p-4">
                          <h4 className="font-medium mb-2">Que faire si ma livraison est en retard ?</h4>
                          <p className="text-sm text-gray-600">
                            Contactez notre support client. Nous vérifierons le statut avec le transporteur et vous
                            tiendrons informé.
                          </p>
                        </Card>

                        <Card className="p-4">
                          <h4 className="font-medium mb-2">Comment modifier mon adresse de livraison ?</h4>
                          <p className="text-sm text-gray-600">
                            Si votre commande n'est pas encore expédiée, contactez-nous rapidement pour modifier
                            l'adresse.
                          </p>
                        </Card>

                        <Card className="p-4">
                          <h4 className="font-medium mb-2">Comment retourner un produit ?</h4>
                          <p className="text-sm text-gray-600">
                            Vous avez 14 jours pour retourner un produit. Contactez notre service client pour obtenir un
                            bon de retour.
                          </p>
                        </Card>
                      </div>
                    </div>
                  )}

                  {currentView === "problem_report" && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Signaler un Problème</h3>
                        <Button variant="outline" size="sm" onClick={showMainMenu}>
                          Retour au menu
                        </Button>
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          <Button
                            variant="outline"
                            className="h-auto p-4 flex flex-col items-center space-y-2"
                            onClick={() => {
                              setChatMessages((prev) => [
                                ...prev,
                                {
                                  type: "bot",
                                  message:
                                    "🚚 **Problème de livraison signalé**\n\nJe comprends votre préoccupation. Notre équipe va immédiatement vérifier le statut de votre livraison avec le transporteur et vous contacter dans les 2 heures.",
                                  timestamp: new Date(),
                                  showButtons: true,
                                },
                              ])
                              setCurrentView(null)
                            }}
                          >
                            <Truck className="h-6 w-6 text-orange-600" />
                            <span className="text-sm font-medium">Retard de livraison</span>
                          </Button>

                          <Button
                            variant="outline"
                            className="h-auto p-4 flex flex-col items-center space-y-2"
                            onClick={() => {
                              setChatMessages((prev) => [
                                ...prev,
                                {
                                  type: "bot",
                                  message:
                                    "📦 **Produit endommagé signalé**\n\nNous sommes désolés pour ce désagrément. Un bon de retour vous sera envoyé par email dans l'heure. Un produit de remplacement sera expédié dès réception du retour.",
                                  timestamp: new Date(),
                                  showButtons: true,
                                },
                              ])
                              setCurrentView(null)
                            }}
                          >
                            <AlertCircle className="h-6 w-6 text-red-600" />
                            <span className="text-sm font-medium">Produit endommagé</span>
                          </Button>

                          <Button
                            variant="outline"
                            className="h-auto p-4 flex flex-col items-center space-y-2"
                            onClick={() => {
                              setChatMessages((prev) => [
                                ...prev,
                                {
                                  type: "bot",
                                  message:
                                    "❌ **Erreur de commande signalée**\n\nNous allons vérifier votre commande et corriger l'erreur. Si nécessaire, nous procéderons à un échange ou un remboursement. Un agent vous contactera sous 1 heure.",
                                  timestamp: new Date(),
                                  showButtons: true,
                                },
                              ])
                              setCurrentView(null)
                            }}
                          >
                            <Package className="h-6 w-6 text-blue-600" />
                            <span className="text-sm font-medium">Erreur de commande</span>
                          </Button>

                          <Button
                            variant="outline"
                            className="h-auto p-4 flex flex-col items-center space-y-2"
                            onClick={() => {
                              setChatMessages((prev) => [
                                ...prev,
                                {
                                  type: "bot",
                                  message:
                                    "💳 **Problème de facturation signalé**\n\nNotre service comptabilité va examiner votre facture et vous contacter dans les 24 heures pour résoudre le problème. En cas d'erreur, un remboursement sera effectué.",
                                  timestamp: new Date(),
                                  showButtons: true,
                                },
                              ])
                              setCurrentView(null)
                            }}
                          >
                            <FileText className="h-6 w-6 text-purple-600" />
                            <span className="text-sm font-medium">Problème facturation</span>
                          </Button>
                        </div>

                        <Card className="p-4 bg-blue-50 border-blue-200">
                          <div className="flex items-start space-x-3">
                            <MessageCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-blue-900 mb-1">Besoin d'aide personnalisée ?</h4>
                              <p className="text-sm text-blue-700 mb-3">
                                Décrivez votre problème en détail et notre équipe vous aidera rapidement.
                              </p>
                              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                Contacter un agent
                              </Button>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions Footer */}
          <div className="border-t border-gray-200 bg-white p-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">Actions rapides :</span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleButtonClick("track_order")}>
                    <Truck className="h-4 w-4 mr-1" />
                    Suivi
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleButtonClick("feedback")}>
                    <Star className="h-4 w-4 mr-1" />
                    Avis
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleButtonClick("support")}>
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Support
                  </Button>
                  <Button variant="outline" size="sm" onClick={showMainMenu}>
                    Menu principal
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
