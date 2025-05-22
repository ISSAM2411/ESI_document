import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, FileUp, Save } from "lucide-react"
import Link from "next/link"

export default function AdminSettings() {
  // Données simulées pour un admin
  const user = {
    name: "Admin Système",
    email: "admin@esi.dz",
    role: "admin",
  }

  return (
    <DashboardLayout role="admin" user={user}>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/dashboard">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Retour</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Paramètres</h1>
        </div>

        <Tabs defaultValue="templates">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="emails">Emails</TabsTrigger>
            <TabsTrigger value="system">Système</TabsTrigger>
          </TabsList>
          <TabsContent value="templates" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Templates des documents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Template d&apos;attestation de travail</Label>
                  <div className="border rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium">Modèle-Attestation de travail-1.pdf</p>
                      <p className="text-sm text-muted-foreground">Dernière modification: 15/03/2025</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Télécharger
                      </Button>
                      <Button size="sm">Remplacer</Button>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Template d&apos;ordre de mission</Label>
                  <div className="border rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium">Modèle-Ordre de Mission.docx</p>
                      <p className="text-sm text-muted-foreground">Dernière modification: 10/02/2025</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Télécharger
                      </Button>
                      <Button size="sm">Remplacer</Button>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Ajouter un nouveau template</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                    <FileUp className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">Glissez-déposez un fichier ici ou</p>
                    <Button variant="outline" size="sm">
                      Parcourir
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="emails" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Configuration des emails</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-server">Serveur SMTP</Label>
                  <Input id="email-server" placeholder="smtp.example.com" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-port">Port</Label>
                    <Input id="email-port" placeholder="587" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-security">Sécurité</Label>
                    <Input id="email-security" placeholder="TLS" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-from">Email expéditeur</Label>
                  <Input id="email-from" placeholder="noreply@esi.dz" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-template">Template d&apos;email de notification</Label>
                  <Textarea
                    id="email-template"
                    placeholder="Contenu du template d'email"
                    className="min-h-[200px]"
                    defaultValue={`Bonjour {nom},

Votre demande {type_demande} a été {statut}.

Référence: {reference}
Date: {date}

Cordialement,
L'équipe ESI Doc`}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">
                  <Save className="mr-2 h-4 w-4" />
                  Enregistrer
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="system" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres système</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="app-name">Nom de l&apos;application</Label>
                  <Input id="app-name" defaultValue="ESI Doc" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="retention">Durée de rétention des documents (jours)</Label>
                  <Input id="retention" type="number" defaultValue="365" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backup-path">Chemin de sauvegarde</Label>
                  <Input id="backup-path" defaultValue="/var/backups/esidoc" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="log-level">Niveau de log</Label>
                  <Input id="log-level" defaultValue="INFO" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">
                  <Save className="mr-2 h-4 w-4" />
                  Enregistrer
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
