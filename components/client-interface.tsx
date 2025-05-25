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
  Download,
  Eye,
  Send,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

interface ClientInterfaceProps {
  clientName: string
  orderNumber: string
  onLogout: () => void
}

export default function ClientInterface({ clientName, orderNumber, onLogout }: ClientInterfaceProps) {
  const [chatOption, setChatOption] = useState<"track" | "feedback" | "support" | null>(null)
  const [chatMessages, setChatMessages] = useState([
    {
      type: "bot",
      message: `Bonjour ${clientName} ! Je suis votre assistant personnel. Comment puis-je vous aider aujourd'hui ?`,
      timestamp: new Date(),
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [feedbackRating, setFeedbackRating] = useState(0)
  const [feedbackComment, setFeedbackComment] = useState("")
  const [feedbackCategory, setFeedbackCategory] = useState("")

  // Données simulées pour la commande
  const orderDetails = {
    id: orderNumber,
    status: "En transit",
    orderDate: "2024-01-12",
    estimatedDelivery: "2024-01-25",
    actualDelivery: null,
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

        if (chatOption === "track" || lowerMessage.includes("commande") || lowerMessage.includes("livraison")) {
          botResponse = `Votre commande ${orderNumber} est actuellement ${orderDetails.status.toLowerCase()}. Elle devrait arriver le ${orderDetails.estimatedDelivery}. Numéro de suivi : ${orderDetails.trackingNumber}. Voulez-vous plus de détails sur le suivi ?`
        } else if (chatOption === "feedback" || lowerMessage.includes("avis") || lowerMessage.includes("feedback")) {
          botResponse =
            "Je serais ravi de recueillir votre avis ! Vous pouvez évaluer votre expérience et laisser un commentaire. Cela nous aide énormément à améliorer nos services."
        } else if (chatOption === "support" || lowerMessage.includes("aide") || lowerMessage.includes("problème")) {
          botResponse =
            "Je suis là pour vous aider ! Vous pouvez me poser des questions sur votre commande, signaler un problème, ou demander des informations. Que puis-je faire pour vous ?"
        } else if (lowerMessage.includes("retard") || lowerMessage.includes("délai")) {
          botResponse =
            "Je comprends votre préoccupation concernant les délais. Votre commande est suivie en temps réel et nous vous informerons immédiatement de tout changement. Souhaitez-vous que je vérifie s'il y a des mises à jour ?"
        } else {
          botResponse =
            "Je peux vous aider avec le suivi de votre commande, recueillir votre feedback, ou répondre à vos questions. Que souhaitez-vous faire ?"
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

  const submitFeedback = () => {
    if (feedbackRating > 0) {
      const feedbackMessage = `Évaluation: ${feedbackRating}/5 étoiles${
        feedbackCategory ? ` - Catégorie: ${feedbackCategory}` : ""
      }${feedbackComment ? ` - Commentaire: ${feedbackComment}` : ""}`

      setChatMessages((prev) => [
        ...prev,
        { type: "user", message: feedbackMessage, timestamp: new Date() },
        {
          type: "bot",
          message:
            "Merci beaucoup pour votre évaluation ! Votre feedback a été enregistré et transmis à notre équipe. Nous l'utiliserons pour améliorer continuellement nos services.",
          timestamp: new Date(),
        },
      ])

      setFeedbackRating(0)
      setFeedbackComment("")
      setFeedbackCategory("")
      setChatOption(null)
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

      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Order Status Banner */}
            <Card className="mb-6 border-l-4 border-l-orange-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-orange-100 rounded-full">
                      <Truck className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Votre commande est en transit</h3>
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

            {/* Main Tabs */}
            <Tabs defaultValue="tracking" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="tracking">Suivi de Commande</TabsTrigger>
                <TabsTrigger value="details">Détails</TabsTrigger>
                <TabsTrigger value="support">Support</TabsTrigger>
              </TabsList>

              <TabsContent value="tracking" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Tracking Timeline */}
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <MapPin className="h-5 w-5 text-green-500 mr-2" />
                          Suivi de Livraison
                        </CardTitle>
                        <CardDescription>Suivez votre commande en temps réel</CardDescription>
                      </CardHeader>
                      <CardContent>
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
                      </CardContent>
                    </Card>
                  </div>

                  {/* Tracking Info */}
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Informations de Suivi</CardTitle>
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
                          Suivre sur le site du transporteur
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Adresse de Livraison</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p className="text-sm font-medium">{orderDetails.shippingAddress.name}</p>
                        <p className="text-sm text-gray-600">{orderDetails.shippingAddress.street}</p>
                        <p className="text-sm text-gray-600">{orderDetails.shippingAddress.city}</p>
                        <p className="text-sm text-gray-600">{orderDetails.shippingAddress.country}</p>
                        <div className="flex items-center space-x-2 mt-3">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <p className="text-sm text-gray-600">{orderDetails.shippingAddress.phone}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="details" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Order Items */}
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Articles Commandés</CardTitle>
                        <CardDescription>Détails de votre commande {orderDetails.id}</CardDescription>
                      </CardHeader>
                      <CardContent>
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
                        </div>
                        <Separator className="my-4" />
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold">Total</span>
                          <span className="text-lg font-bold text-green-600">{orderDetails.total}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Order Summary */}
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Résumé de Commande</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <p className="text-xs text-gray-600">Numéro de commande</p>
                          <p className="font-mono text-sm">{orderDetails.id}</p>
                        </div>
                        <Separator />
                        <div>
                          <p className="text-xs text-gray-600">Date de commande</p>
                          <p className="text-sm">{orderDetails.orderDate}</p>
                        </div>
                        <Separator />
                        <div>
                          <p className="text-xs text-gray-600">Statut</p>
                          <Badge className={getStatusColor(orderDetails.status)}>{orderDetails.status}</Badge>
                        </div>
                        <Button className="w-full mt-4" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Télécharger la facture
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Besoin d'aide ?</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-gray-600">
                          Notre équipe support est là pour vous aider avec votre commande.
                        </p>
                        <div className="space-y-2">
                          <Button className="w-full" variant="outline">
                            <Mail className="h-4 w-4 mr-2" />
                            Contacter par email
                          </Button>
                          <Button className="w-full" variant="outline">
                            <Phone className="h-4 w-4 mr-2" />
                            Appeler le support
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="support" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* FAQ */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Questions Fréquentes</CardTitle>
                      <CardDescription>Trouvez rapidement des réponses à vos questions</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium mb-2">Comment suivre ma commande ?</h4>
                        <p className="text-sm text-gray-600">
                          Utilisez votre numéro de suivi dans l'onglet "Suivi de Commande" ou sur le site du
                          transporteur.
                        </p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium mb-2">Que faire si ma livraison est en retard ?</h4>
                        <p className="text-sm text-gray-600">
                          Contactez notre support client. Nous vérifierons le statut et vous tiendrons informé.
                        </p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium mb-2">Comment modifier mon adresse de livraison ?</h4>
                        <p className="text-sm text-gray-600">
                          Si votre commande n'est pas encore expédiée, contactez-nous pour modifier l'adresse.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Contact Support */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Contacter le Support</CardTitle>
                      <CardDescription>Notre équipe est là pour vous aider</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 gap-3">
                        <Button className="justify-start h-auto p-4" variant="outline">
                          <Mail className="h-5 w-5 mr-3" />
                          <div className="text-left">
                            <p className="font-medium">Email Support</p>
                            <p className="text-sm text-gray-600">support@stockassist.com</p>
                          </div>
                        </Button>
                        <Button className="justify-start h-auto p-4" variant="outline">
                          <Phone className="h-5 w-5 mr-3" />
                          <div className="text-left">
                            <p className="font-medium">Téléphone</p>
                            <p className="text-sm text-gray-600">+33 1 23 45 67 89</p>
                          </div>
                        </Button>
                        <Button className="justify-start h-auto p-4" variant="outline">
                          <MessageCircle className="h-5 w-5 mr-3" />
                          <div className="text-left">
                            <p className="font-medium">Chat en Direct</p>
                            <p className="text-sm text-gray-600">Disponible 24h/7j</p>
                          </div>
                        </Button>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="font-medium mb-3">Horaires du Support</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Lundi - Vendredi</span>
                            <span>9h00 - 18h00</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Samedi</span>
                            <span>9h00 - 12h00</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Dimanche</span>
                            <span>Fermé</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Chat Assistant Sidebar */}
        <div className="w-80 bg-white border-l border-gray-200 h-screen overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-green-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-900">Assistant Client</h3>
                  <p className="text-xs text-green-600">Comment puis-je vous aider ?</p>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Options */}
          {!chatOption && (
            <div className="p-4 space-y-3">
              <h4 className="font-medium text-gray-900 mb-3">Choisissez une option :</h4>
              <Button
                className="w-full justify-start bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
                variant="outline"
                onClick={() => setChatOption("track")}
              >
                <Truck className="h-4 w-4 mr-3" />
                Suivre ma commande
              </Button>
              <Button
                className="w-full justify-start bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                variant="outline"
                onClick={() => setChatOption("feedback")}
              >
                <Star className="h-4 w-4 mr-3" />
                Donner un feedback
              </Button>
              <Button
                className="w-full justify-start bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200"
                variant="outline"
                onClick={() => setChatOption("support")}
              >
                <MessageCircle className="h-4 w-4 mr-3" />
                Support technique
              </Button>
            </div>
          )}

          {/* Feedback Form */}
          {chatOption === "feedback" && (
            <div className="p-4 space-y-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-900">Votre Avis</h4>
                <Button variant="ghost" size="sm" onClick={() => setChatOption(null)}>
                  ×
                </Button>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Note générale</label>
                <div className="flex space-x-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setFeedbackRating(star)}
                      className={`text-2xl transition-colors ${
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
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm"
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
                  className="text-sm"
                  rows={3}
                  value={feedbackComment}
                  onChange={(e) => setFeedbackComment(e.target.value)}
                />
              </div>

              <div className="flex space-x-2">
                <Button className="flex-1" onClick={submitFeedback} disabled={feedbackRating === 0}>
                  <Send className="h-4 w-4 mr-2" />
                  Envoyer
                </Button>
                <Button variant="outline" onClick={() => setChatOption(null)}>
                  Annuler
                </Button>
              </div>
            </div>
          )}

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-96">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                <div className="flex items-start space-x-2 max-w-xs">
                  {msg.type === "bot" && (
                    <Avatar className="h-6 w-6 mt-1">
                      <AvatarFallback className="bg-green-100 text-green-600 text-xs">IA</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg p-3 ${
                      msg.type === "user"
                        ? "bg-green-600 text-white"
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
                      <AvatarFallback className="bg-green-100 text-green-600 text-xs">
                        {clientName
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

          {/* Chat Input */}
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
                <Send className="h-4 w-4" />
              </Button>
            </div>

            {chatOption && (
              <Button variant="outline" className="w-full mt-2 text-xs" onClick={() => setChatOption(null)}>
                Changer d'option
              </Button>
            )}

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-1 mt-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => setNewMessage("Où est ma commande ?")}
              >
                Où est ma commande ?
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => setNewMessage("Problème de livraison")}
              >
                Problème livraison
              </Button>
              <Button variant="outline" size="sm" className="text-xs" onClick={() => setNewMessage("Aide")}>
                Aide
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
