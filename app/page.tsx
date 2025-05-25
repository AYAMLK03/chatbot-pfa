"use client"

import { useState } from "react"
import { Package, Users, ArrowRight, Shield, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import SupervisorChatbot from "@/components/supervisor-chatbot"
import ClientChatbot from "@/components/client-chatbot"

export default function HomePage() {
  const [selectedRole, setSelectedRole] = useState<"supervisor" | "client" | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userCredentials, setUserCredentials] = useState({ name: "", id: "" })

  if (isLoggedIn && selectedRole === "supervisor") {
    return (
      <SupervisorChatbot
        supervisorName={userCredentials.name}
        supervisorId={userCredentials.id}
        onLogout={() => {
          setIsLoggedIn(false)
          setSelectedRole(null)
          setUserCredentials({ name: "", id: "" })
        }}
      />
    )
  }

  if (isLoggedIn && selectedRole === "client") {
    return (
      <ClientChatbot
        clientName={userCredentials.name}
        orderNumber={userCredentials.id}
        onLogout={() => {
          setIsLoggedIn(false)
          setSelectedRole(null)
          setUserCredentials({ name: "", id: "" })
        }}
      />
    )
  }

  if (selectedRole === "supervisor") {
    return (
      <SupervisorLogin
        onBack={() => setSelectedRole(null)}
        onLogin={(name, id) => {
          setUserCredentials({ name, id })
          setIsLoggedIn(true)
        }}
      />
    )
  }

  if (selectedRole === "client") {
    return (
      <ClientLogin
        onBack={() => setSelectedRole(null)}
        onLogin={(name, orderNumber) => {
          setUserCredentials({ name, id: orderNumber })
          setIsLoggedIn(true)
        }}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Package className="h-16 w-16 text-blue-600 mr-4" />
            <h1 className="text-5xl font-bold text-gray-900">StockAssist</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Votre assistant intelligent pour la gestion de stock et le suivi des commandes
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Superviseur Card */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-300">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl text-gray-900">Superviseur</CardTitle>
              <CardDescription className="text-gray-600">Gérez votre inventaire avec l'assistant IA</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Assistant IA conversationnel
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Actions rapides par boutons
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Gestion intelligente des stocks
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Alertes et rapports automatiques
                </div>
              </div>
              <Button
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
                onClick={() => setSelectedRole("supervisor")}
              >
                Accès Superviseur
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Client Card */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-green-300">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-gray-900">Client</CardTitle>
              <CardDescription className="text-gray-600">Suivez vos commandes avec l'assistant IA</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Chatbot personnel intelligent
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Suivi de commande en temps réel
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Support client instantané
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Feedback et avis simplifiés
                </div>
              </div>
              <Button className="w-full mt-6 bg-green-600 hover:bg-green-700" onClick={() => setSelectedRole("client")}>
                Accès Client
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8">Pourquoi choisir StockAssist ?</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <MessageCircle className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Chatbot Intelligent</h4>
              <p className="text-sm text-gray-600">
                Interface conversationnelle avec boutons d'actions pour une expérience intuitive
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Package className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Actions Rapides</h4>
              <p className="text-sm text-gray-600">
                Boutons prédéfinis pour accéder instantanément aux fonctions principales
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Shield className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Expérience Personnalisée</h4>
              <p className="text-sm text-gray-600">
                Interface adaptée selon votre rôle avec des fonctionnalités spécialisées
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SupervisorLogin({ onBack, onLogin }: { onBack: () => void; onLogin: (name: string, id: string) => void }) {
  const [fullName, setFullName] = useState("")
  const [supervisorId, setSupervisorId] = useState("")

  const handleLogin = () => {
    if (fullName.trim() && supervisorId.trim()) {
      onLogin(fullName, supervisorId)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">Connexion Superviseur</CardTitle>
          <CardDescription>Accédez à votre assistant IA de gestion</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Nom Complet</label>
            <Input
              type="text"
              placeholder="Entrez votre nom complet"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">ID Superviseur</label>
            <Input
              type="text"
              placeholder="Entrez votre ID superviseur"
              value={supervisorId}
              onChange={(e) => setSupervisorId(e.target.value)}
            />
          </div>
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={handleLogin}
            disabled={!fullName.trim() || !supervisorId.trim()}
          >
            Accéder au Chatbot
          </Button>
          <Button variant="outline" className="w-full" onClick={onBack}>
            Retour
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function ClientLogin({
  onBack,
  onLogin,
}: { onBack: () => void; onLogin: (name: string, orderNumber: string) => void }) {
  const [fullName, setFullName] = useState("")
  const [orderNumber, setOrderNumber] = useState("")

  const handleLogin = () => {
    if (fullName.trim() && orderNumber.trim()) {
      onLogin(fullName, orderNumber)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit">
            <Users className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Connexion Client</CardTitle>
          <CardDescription>Accédez à votre assistant personnel</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Nom Complet</label>
            <Input
              type="text"
              placeholder="Entrez votre nom complet"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Numéro de Commande</label>
            <Input
              type="text"
              placeholder="Ex: CMD001"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
            />
          </div>
          <Button
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={handleLogin}
            disabled={!fullName.trim() || !orderNumber.trim()}
          >
            Accéder au Chatbot
          </Button>
          <Button variant="outline" className="w-full" onClick={onBack}>
            Retour
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
