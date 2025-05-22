import { NextResponse } from "next/server"

export async function GET() {
  const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ordre de Mission - ESI</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Roboto:wght@400;700&display=swap');

        :root {
            --primary-color: #0056b3;
            --border-color: #ccc;
            --bg-color: #f9f9f9;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'Roboto', sans-serif;
            line-height: 1.5;
            color: #333;
            background-color: #fff;
            margin: 0;
            padding: 0;
        }

        .page {
            width: 210mm;
            height: 297mm;
            margin: 0 auto;
            background-color: white;
            position: relative;
            padding: 20mm 15mm;
        }

        .page-1 {
            page-break-after: always;
        }

        .header {
            text-align: center;
            margin-bottom: 15px;
            border-bottom: 1px solid var(--primary-color);
            padding-bottom: 10px;
        }

        .header-ar {
            font-family: 'Amiri', serif;
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 3px;
            direction: rtl;
        }

        .header-fr {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 3px;
        }

        .school-name {
            display: flex;
            justify-content: space-between;
            margin: 10px 0;
        }

        .school-name-ar {
            font-family: 'Amiri', serif;
            font-size: 14px;
            font-weight: bold;
            direction: rtl;
        }

        .school-name-fr {
            font-size: 14px;
            font-weight: bold;
        }

        .document-number {
            display: flex;
            justify-content: flex-start;
            margin: 15px 0;
        }

        .mission-title {
            text-align: center;
            font-size: 16px;
            font-weight: bold;
            margin: 15px 0;
            text-decoration: underline;
        }

        .form-group {
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            font-size: 12px;
        }

        .form-group label {
            width: 180px;
            font-weight: bold;
        }

        .form-group input, .form-group select {
            flex: 1;
            padding: 4px;
            border: 1px solid var(--border-color);
            border-radius: 2px;
            font-size: 12px;
        }

        .signature-section {
            margin-top: 15px;
            text-align: right;
            font-size: 12px;
        }

        .signature-date {
            margin-bottom: 5px;
        }

        .signature-title {
            font-weight: bold;
            margin-bottom: 30px;
        }

        .visa-section {
            margin-top: 15px;
            border: 1px solid var(--border-color);
            padding: 10px;
            font-size: 12px;
        }

        .visa-title {
            font-weight: bold;
            text-align: center;
            margin-bottom: 10px;
        }

        .visa-table {
            width: 100%;
            border-collapse: collapse;
        }

        .visa-table th, .visa-table td {
            border: 1px solid var(--border-color);
            padding: 5px;
            text-align: center;
        }

        .footer {
            position: absolute;
            bottom: 10mm;
            left: 15mm;
            right: 15mm;
            text-align: center;
            font-size: 10px;
            border-top: 1px solid var(--border-color);
            padding-top: 5px;
        }

        .travel-table {
            width: 100%;
            border-collapse: collapse;
            margin: 10px 0;
            font-size: 11px;
        }

        .travel-table th, .travel-table td {
            border: 1px solid var(--border-color);
            padding: 4px;
            text-align: center;
        }

        .travel-table th {
            background-color: var(--bg-color);
        }

        .certification {
            margin-top: 15px;
            font-size: 12px;
        }

        .print-btn {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 8px 16px;
            background-color: var(--primary-color);
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            z-index: 1000;
        }

        .print-btn:hover {
            background-color: #003d7a;
        }

        .notes {
            margin-top: 15px;
            font-size: 10px;
        }

        @media print {
            @page {
                size: A4;
                margin: 0;
            }
            
            body {
                margin: 0;
                padding: 0;
            }
            
            .page {
                margin: 0;
                padding: 20mm 15mm;
                page-break-after: always;
                width: 100%;
                height: 100%;
            }
            
            .print-btn {
                display: none;
            }
        }
    </style>
</head>
<body>
    <button class="print-btn" onclick="window.print()">Imprimer le formulaire</button>
    
    <!-- Page 1 -->
    <div class="page page-1">
        <div class="header">
            <div class="header-ar">الـجــمھـوریة الجـزائــریة الـدیـمقراطـیة الـشـعبـیة</div>
            <div class="header-fr">REPUBLIQUE ALGERIENNE DEMOCRATIQUE ET POPULAIRE</div>
            <div class="header-ar">وزارة الـتعـلـیـم الـعـالـي والـبحــث الـعـلمي</div>
            <div class="header-fr">MINISTERE DE L'ENSEIGNEMENT SUPERIEUR ET DE LA RECHERCHE SCIENTIFIQUE</div>
        </div>

        <div class="school-name">
            <div class="school-name-fr">Ecole nationale Supérieure d'Informatique</div>
            <div class="school-name-ar">الـمـدرسة الـوطنیة العلیا للإعلام</div>
        </div>

        <div class="document-number">
            <div>N°: ________/2025</div>
        </div>

        <div class="mission-title">ORDRE DE MISSION</div>

        <div class="form-group">
            <label>Le (La) Soussigné(e):</label>
            <input type="text" name="signe" value="Fatima Zerrouki">
        </div>

        <div class="form-group">
            <label>Ordonne à M./Mme:</label>
            <input type="text" name="personne" value="Karim Messaoudi">
        </div>

        <div class="form-group">
            <label>Fonction:</label>
            <input type="text" name="fonction" value="Maître de conférences">
        </div>

        <div class="form-group">
            <label>Service:</label>
            <input type="text" name="service" value="Département Systèmes d'Information">
        </div>

        <div class="form-group">
            <label>De se rendre en mission de:</label>
            <input type="text" name="lieu_depart" placeholder="Lieu de départ" value="Alger">
            <span style="margin: 0 5px;">à</span>
            <input type="text" name="lieu_arrivee" placeholder="Lieu d'arrivée" value="Annaba - École Supérieure de Technologie">
        </div>

        <div class="form-group">
            <label>Objet complet de la mission:</label>
            <input type="text" name="objet" value="Audit des systèmes d'information">
        </div>

        <div class="form-group">
            <label>Moyen de transport:</label>
            <input type="text" name="transport" value="Véhicule personnel">
        </div>

        <div class="form-group">
            <label>Date de départ:</label>
            <input type="date" name="date_depart" value="2025-04-18">
        </div>

        <div class="form-group">
            <label>Date de retour:</label>
            <input type="date" name="date_retour" value="2025-04-20">
        </div>

        <div class="form-group">
            <label>Prière aux autorités civiles et militaires de bien vouloir faciliter à M./Mme:</label>
            <input type="text" name="nom_facilitation" value="Karim Messaoudi">
            <span style="margin: 0 5px;">l'accomplissement de sa mission.</span>
        </div>

        <div class="form-group">
            <label>Pièce d'identité:</label>
            <input type="text" name="piece_identite" value="Carte Nationale d'Identité">
            <span style="margin: 0 5px;">délivrée le:</span>
            <input type="date" name="date_piece" value="2020-01-15">
            <span style="margin: 0 5px;">à:</span>
            <input type="text" name="lieu_piece" value="Alger">
        </div>

        <div class="signature-section">
            <div class="signature-date">Fait à: <input type="text" style="width: 150px;" value="Alger"> le: <input type="date" style="width: 150px;" value="2025-04-15"></div>
            <div class="signature-title">Le Responsable du service émetteur de l'ordre de mission</div>
            <div style="height: 50px;"></div>
        </div>

        <div class="visa-section">
            <div class="visa-title">Cadre réservé aux visas<sup>(1)</sup></div>
            <table class="visa-table">
                <tr>
                    <th>Date et heure d'arrivée</th>
                    <th>Date et heure de départ</th>
                </tr>
                <tr>
                    <td style="height: 30px;"></td>
                    <td></td>
                </tr>
            </table>
        </div>

        <div class="footer">
            ESI (Ecole nationale Supérieure d'Informatique) BP 68M, 16059, Oued Smar, Algérie<br>
            Tél : 023.93.91.32  Fax : 023.93.91.34 ; http://www.esi.dz
        </div>
    </div>
</body>
</html>
  `

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html",
    },
  })
}
