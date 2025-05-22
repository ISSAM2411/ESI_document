"use client"

import { useRef, useEffect } from "react"
import type { Mission } from "@/types/mission"

interface MissionTemplateArProps {
  mission: Mission
  onPrint?: () => void
}

export function MissionTemplateAr({ mission, onPrint }: MissionTemplateArProps) {
  const printButtonRef = useRef<HTMLButtonElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Fonction pour imprimer le document
  const handlePrint = () => {
    if (containerRef.current) {
      const printContent = containerRef.current.innerHTML
      const printWindow = window.open("", "_blank")
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html dir="rtl" lang="ar">
          <head>
            <meta charset="UTF-8">
            <title>أمر بمهمة - ${mission.id}</title>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Roboto:wght@400;700&display=swap');
              
              body {
                font-family: 'Amiri', serif;
                margin: 0;
                padding: 0;
                direction: rtl;
              }
              
              .page {
                width: 210mm;
                height: 297mm;
                margin: 0 auto;
                background-color: white;
                position: relative;
                padding: 20mm 15mm;
                page-break-after: always;
              }
              
              .page:last-child {
                page-break-after: auto;
              }
              
              .header {
                text-align: center;
                margin-bottom: 15px;
                padding-bottom: 10px;
              }
              
              .header-title {
                text-align: center;
                margin-bottom: 5px;
              }
              
              .header-title-ar {
                font-size: 16px;
                font-weight: bold;
                margin-bottom: 3px;
              }
              
              .header-title-fr {
                font-family: 'Roboto', sans-serif;
                font-size: 14px;
                font-weight: bold;
                margin-bottom: 3px;
                direction: ltr;
              }
              
              .header-separator {
                height: 1px;
                background-color: #0061B2;
                margin: 10px 0;
              }
              
              .school-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin: 10px 0;
                flex-direction: row-reverse;
              }
              
              .school-logo {
                width: 120px;
                height: auto;
              }
              
              .school-name {
                text-align: right;
              }
              
              .school-name-ar {
                font-size: 16px;
                font-weight: bold;
              }
              
              .school-name-fr {
                font-family: 'Roboto', sans-serif;
                font-size: 14px;
                font-weight: bold;
                direction: ltr;
              }
              
              .document-number {
                display: flex;
                justify-content: flex-end;
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
                border: 1px solid #ccc;
                border-radius: 2px;
                text-align: right;
                font-size: 12px;
                font-family: 'Amiri', serif;
              }
              
              .signature-section {
                margin-top: 15px;
                text-align: left;
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
                border: 1px solid #ccc;
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
                border: 1px solid #ccc;
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
                border-top: 1px solid #ccc;
                padding-top: 5px;
                font-family: 'Roboto', sans-serif;
                direction: ltr;
              }
              
              .travel-table {
                width: 100%;
                border-collapse: collapse;
                margin: 10px 0;
                font-size: 11px;
              }
              
              .travel-table th, .travel-table td {
                border: 1px solid #ccc;
                padding: 4px;
                text-align: center;
              }
              
              .travel-table th {
                background-color: #f9f9f9;
              }
              
              .certification {
                margin-top: 15px;
                font-size: 12px;
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
                
                .page:last-child {
                  page-break-after: auto;
                }
                
                .print-btn {
                  display: none;
                }
              }
            </style>
          </head>
          <body>
            ${printContent}
          </body>
          </html>
        `)
        printWindow.document.close()
        printWindow.focus()
        setTimeout(() => {
          printWindow.print()
          // printWindow.close()
        }, 1000)
      }
    }
  }

  useEffect(() => {
    // Attacher l'événement au bouton interne
    if (printButtonRef.current) {
      printButtonRef.current.addEventListener("click", handlePrint)
    }

    return () => {
      // Nettoyer l'événement lors du démontage du composant
      if (printButtonRef.current) {
        printButtonRef.current.removeEventListener("click", handlePrint)
      }
    }
  }, [mission.id])

  // Exposer la fonction d'impression au parent
  useEffect(() => {
    if (onPrint) {
      // Remplacer la fonction onPrint par notre fonction handlePrint
      const originalOnPrint = onPrint
      onPrint = () => {
        handlePrint()
        originalOnPrint()
      }
    }
  }, [onPrint])

  return (
    <div className="bg-white h-full w-full overflow-auto">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Roboto:wght@400;700&display=swap');

        .ar-template {
          font-family: 'Amiri', serif;
          line-height: 1.5;
          color: #333;
          background-color: #fff;
          margin: 0;
          padding: 0;
          direction: rtl;
        }

        .ar-template .page {
          width: 210mm;
          margin: 0 auto 20px auto;
          background-color: white;
          position: relative;
          padding: 20mm 15mm;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          min-height: 297mm;
        }

        .ar-template .header {
          text-align: center;
          margin-bottom: 15px;
          padding-bottom: 10px;
        }

        .ar-template .header-title {
          text-align: center;
          margin-bottom: 5px;
        }

        .ar-template .header-title-ar {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 3px;
        }

        .ar-template .header-title-fr {
          font-family: 'Roboto', sans-serif;
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 3px;
          direction: ltr;
        }

        .ar-template .header-separator {
          height: 1px;
          background-color: #0061B2;
          margin: 10px 0;
        }

        .ar-template .school-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 10px 0;
          flex-direction: row-reverse;
        }

        .ar-template .school-logo {
          width: 120px;
          height: auto;
        }

        .ar-template .school-name {
          text-align: right;
        }

        .ar-template .school-name-ar {
          font-size: 16px;
          font-weight: bold;
        }

        .ar-template .school-name-fr {
          font-family: 'Roboto', sans-serif;
          font-size: 14px;
          font-weight: bold;
          direction: ltr;
        }

        .ar-template .document-number {
          display: flex;
          justify-content: flex-end;
          margin: 15px 0;
        }

        .ar-template .mission-title {
          text-align: center;
          font-size: 16px;
          font-weight: bold;
          margin: 15px 0;
          text-decoration: underline;
        }

        .ar-template .form-group {
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          font-size: 12px;
        }

        .ar-template .form-group label {
          width: 180px;
          font-weight: bold;
        }

        .ar-template .form-group input, .ar-template .form-group select {
          flex: 1;
          padding: 4px;
          border: 1px solid #ccc;
          border-radius: 2px;
          text-align: right;
          font-size: 12px;
          font-family: 'Amiri', serif;
        }

        .ar-template .signature-section {
          margin-top: 15px;
          text-align: left;
          font-size: 12px;
        }

        .ar-template .signature-date {
          margin-bottom: 5px;
        }

        .ar-template .signature-title {
          font-weight: bold;
          margin-bottom: 30px;
        }

        .ar-template .visa-section {
          margin-top: 15px;
          border: 1px solid #ccc;
          padding: 10px;
          font-size: 12px;
        }

        .ar-template .visa-title {
          font-weight: bold;
          text-align: center;
          margin-bottom: 10px;
        }

        .ar-template .visa-table {
          width: 100%;
          border-collapse: collapse;
        }

        .ar-template .visa-table th, .ar-template .visa-table td {
          border: 1px solid #ccc;
          padding: 5px;
          text-align: center;
        }

        .ar-template .footer {
          position: absolute;
          bottom: 10mm;
          left: 15mm;
          right: 15mm;
          text-align: center;
          font-size: 10px;
          border-top: 1px solid #ccc;
          padding-top: 5px;
          font-family: 'Roboto', sans-serif;
          direction: ltr;
        }

        .ar-template .travel-table {
          width: 100%;
          border-collapse: collapse;
          margin: 10px 0;
          font-size: 11px;
        }

        .ar-template .travel-table th, .ar-template .travel-table td {
          border: 1px solid #ccc;
          padding: 4px;
          text-align: center;
        }

        .ar-template .travel-table th {
          background-color: #f9f9f9;
        }

        .ar-template .certification {
          margin-top: 15px;
          font-size: 12px;
        }

        .ar-template .notes {
          margin-top: 15px;
          font-size: 10px;
        }

        .ar-template .print-btn {
          position: fixed;
          top: 20px;
          left: 20px;
          padding: 8px 16px;
          background-color: #0061B2;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          z-index: 1000;
        }

        .ar-template .print-btn:hover {
          background-color: #003d7a;
        }

        @media print {
          .ar-template .print-btn {
            display: none;
          }
        }
      `}</style>

      <div className="ar-template" ref={containerRef}>
        <button ref={printButtonRef} className="print-btn">
          طباعة النموذج
        </button>

        {/* Page 1 */}
        <div className="page">
          <div className="header">
            <div className="header-title">
              <div className="header-title-ar">الـجــمھـوریة الجـزائــریة الـدیـمقراطـیة الـشـعبـیة</div>
              <div className="header-title-fr">REPUBLIQUE ALGERIENNE DEMOCRATIQUE ET POPULAIRE</div>
              <div className="header-title-ar">وزارة الـتعـلـیـم الـعـالـي والـبحــث الـعـلمي</div>
              <div className="header-title-fr">
                MINISTERE DE L'ENSEIGNEMENT SUPERIEUR ET DE LA RECHERCHE SCIENTIFIQUE
              </div>
            </div>
            <div className="header-separator"></div>
            <div className="school-header">
              <svg
                className="school-logo"
                width="120"
                height="90"
                viewBox="0 0 384 286"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24.1078 1.20431C12.9917 4.68643 5.08998 12.3203 2.14357 22.6328C0.268579 29.0613 0.000722836 43.6594 0.000722836 142.766C0.000722836 269.06 -0.267133 264.373 9.50961 274.417C18.3489 283.658 23.572 284.596 63.6165 284.596C93.3485 284.596 99.3753 284.194 105.134 282.185C115.045 278.837 121.206 273.078 124.42 264.373C126.964 257.676 127.232 254.06 127.232 222.989V188.837H99.1074H70.9825V223.391C70.9825 248.435 70.5807 258.346 69.3754 259.551C67.2325 261.694 60.9379 261.56 59.0629 259.283C57.9915 258.078 57.5897 245.757 57.8576 216.828L58.2594 176.114L92.8128 175.712L127.232 175.444V101.115C127.232 34.5523 126.964 26.2488 124.955 21.1596C121.607 12.5882 118.259 8.70427 110.625 4.41857L103.795 0.668594L65.6254 0.400738C44.5987 0.26681 25.9827 0.668594 24.1078 1.20431ZM68.8397 27.5881C70.7147 28.2577 70.9825 34.5523 70.9825 84.2396C70.9825 125.891 70.5807 140.489 69.3754 141.695C66.9647 144.105 59.3308 143.704 58.3933 141.159C57.9915 139.954 57.5897 114.507 57.5897 84.5074C57.5897 43.9273 57.9915 29.597 59.1969 28.3917C60.9379 26.6506 65.4915 26.2488 68.8397 27.5881Z"
                  fill="black"
                  fillOpacity="0.9"
                />
                <path
                  d="M168.616 1.87516C158.973 5.35729 154.688 8.70549 150.67 16.0715L146.652 23.4376L146.25 98.705L145.848 174.106H179.866C204.375 174.106 214.152 174.508 215.357 175.714C216.562 176.919 216.964 188.169 216.964 217.901C216.964 256.606 216.83 258.481 214.419 259.82C210.535 261.829 206.919 261.427 204.509 258.749C202.5 256.606 202.232 252.052 202.232 222.588V188.838H173.973H145.848L146.25 224.597C146.652 259.82 146.652 260.624 150 267.186C154.42 276.026 162.857 281.784 174.509 283.793C185.223 285.668 234.241 285.668 243.884 283.927C259.419 280.981 268.526 272.945 271.741 259.418C272.678 255.133 273.214 234.106 273.214 198.08V143.303H239.33C214.821 143.303 205.044 142.901 203.839 141.696C201.562 139.419 201.562 30.6697 203.839 28.3929C204.777 27.4554 207.321 26.7858 209.598 26.7858C211.875 26.7858 214.419 27.4554 215.357 28.3929C216.562 29.5982 216.964 42.8571 216.964 79.9551V129.91H245.089H273.348L272.946 77.2766C272.544 40.4464 271.874 23.3036 270.803 19.8215C268.794 14.0626 262.633 7.63406 255.133 3.61623C250.044 0.803741 247.901 0.669813 211.607 0.401958C182.545 0.134102 172.232 0.401958 168.616 1.87516Z"
                  fill="black"
                  fillOpacity="0.9"
                />
                <path
                  d="M289.151 2.27709C287.678 4.01815 287.41 9.64312 287.678 29.3305C288.348 61.7411 286.473 59.7321 312.187 57.0536C322.767 55.8482 336.026 54.6429 341.651 54.1072C357.588 52.9018 357.588 52.9018 357.588 26.2502C357.588 6.83064 357.321 4.15208 355.178 2.27709C353.035 0.268172 348.615 0.000316587 321.83 0.000316587C294.776 0.000316587 290.758 0.268172 289.151 2.27709Z"
                  fill="#0061B2"
                  fillOpacity="0.9"
                />
                <path
                  d="M350.892 61.2031C347.544 61.471 336.294 62.5424 325.713 63.6138C315.267 64.6853 304.017 65.6228 300.669 65.6228C297.321 65.6228 294.642 66.0245 294.642 66.6942C294.642 67.2299 299.463 69.9084 305.356 72.7209C317.008 78.078 322.499 78.7477 338.838 76.337C343.66 75.6673 355.579 74.1941 365.49 72.9888C375.401 71.9174 383.704 70.712 383.972 70.4442C384.91 69.6406 361.874 60.2656 359.329 60.5335C357.99 60.6674 354.24 60.9353 350.892 61.2031Z"
                  fill="#0061B2"
                  fillOpacity="0.9"
                />
                <path
                  d="M291.964 186.829V285.266H320.088H348.213V186.829V88.3917H320.088H291.964V186.829Z"
                  fill="black"
                  fillOpacity="0.9"
                />
              </svg>
              <div className="school-name">
                <div className="school-name-ar">المـدرسة الـوطنیة العلیا للإعلام</div>
                <div className="school-name-fr">Ecole nationale Supérieure d'Informatique</div>
              </div>
            </div>
          </div>

          <div className="document-number">
            <div>رقم: {mission.id.replace("OM-", "")}</div>
          </div>

          <div className="mission-title">أمر بمھمة</div>

          <div className="form-group">
            <label>إن السید(ة):</label>
            <input type="text" name="signe" defaultValue="فاطمة زروقي" />
          </div>

          <div className="form-group">
            <label>یأمر السید(ة):</label>
            <input type="text" name="personne" defaultValue={mission.missionnaire} />
          </div>

          <div className="form-group">
            <label>المنصب:</label>
            <input type="text" name="fonction" defaultValue="أستاذ محاضر" />
          </div>

          <div className="form-group">
            <label>التابع(ة):</label>
            <input type="text" name="service" defaultValue={mission.demandeur} />
          </div>

          <div className="form-group">
            <label>بالذھاب في مھمة من:</label>
            <input type="text" name="lieu_depart" defaultValue="الجزائر العاصمة" />
            <span style={{ margin: "0 5px" }}>إلى</span>
            <input type="text" name="lieu_arrivee" defaultValue={mission.destination} />
          </div>

          <div className="form-group">
            <label>الموضوع الكامل للمھمة:</label>
            <input type="text" name="objet" defaultValue={mission.objet} />
          </div>

          <div className="form-group">
            <label>وسائل النقل:</label>
            <input type="text" name="transport" defaultValue={mission.transport} />
          </div>

          <div className="form-group">
            <label>تاریخ الذھاب:</label>
            <input type="text" name="date_depart" defaultValue={mission.debut} />
          </div>

          <div className="form-group">
            <label>تاریخ الرجوع:</label>
            <input type="text" name="date_retour" defaultValue={mission.fin} />
          </div>

          <div className="form-group">
            <label>یرجي من السلطات المعنیة والعسكریة أن تسھل للسید(ة):</label>
            <input type="text" name="nom_facilitation" defaultValue={mission.missionnaire} />
            <span style={{ margin: "0 5px" }}>في إداء مھمتھ(ھا)</span>
          </div>

          <div className="form-group">
            <label>وثیقة الھویة:</label>
            <input type="text" name="piece_identite" defaultValue="بطاقة التعريف الوطنية" />
            <span style={{ margin: "0 5px" }}>المسلمة في:</span>
            <input type="text" name="date_piece" defaultValue="15/01/2020" />
            <span style={{ margin: "0 5px" }}>بـ:</span>
            <input type="text" name="lieu_piece" defaultValue="الجزائر العاصمة" />
          </div>

          <div className="signature-section">
            <div className="signature-date">
              في: <input type="text" style={{ width: "150px" }} defaultValue="الجزائر العاصمة" />
              بتاريخ:{" "}
              <input type="text" style={{ width: "150px" }} defaultValue={new Date().toLocaleDateString("ar-DZ")} />
            </div>
            <div className="signature-title">مسؤول المصلحة الذي أصدار الأمر بالمھمة</div>
            <div style={{ height: "50px" }}></div>
          </div>

          <div className="visa-section">
            <div className="visa-title">
              خانة مخصصة للتأشیرات<sup>(1)</sup>
            </div>
            <table className="visa-table">
              <thead>
                <tr>
                  <th>تاریخ ووقت الوصول</th>
                  <th>تاریخ ووقت الخروج</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ height: "30px" }}></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="footer">
            ESI (Ecole nationale Supérieure d'Informatique) BP 68M, 16059, Oued Smar, Algérie
            <br />
            Tél : 023.93.91.32 Fax : 023.93.91.34 ; http://www.esi.dz
          </div>
        </div>

        {/* Page 2 */}
        <div className="page">
          <div className="header">
            <div className="header-title">
              <div className="header-title-ar">الـجــمھـوریة الجـزائــریة الـدیـمقراطـیة الـشـعبـیة</div>
              <div className="header-title-fr">REPUBLIQUE ALGERIENNE DEMOCRATIQUE ET POPULAIRE</div>
              <div className="header-title-ar">وزارة الـتعـلـیـم الـعـالـي والـبحــث الـعـلمي</div>
              <div className="header-title-fr">
                MINISTERE DE L'ENSEIGNEMENT SUPERIEUR ET DE LA RECHERCHE SCIENTIFIQUE
              </div>
            </div>
            <div className="header-separator"></div>
            <div className="school-header">
              <svg
                className="school-logo"
                width="120"
                height="90"
                viewBox="0 0 384 286"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24.1078 1.20431C12.9917 4.68643 5.08998 12.3203 2.14357 22.6328C0.268579 29.0613 0.000722836 43.6594 0.000722836 142.766C0.000722836 269.06 -0.267133 264.373 9.50961 274.417C18.3489 283.658 23.572 284.596 63.6165 284.596C93.3485 284.596 99.3753 284.194 105.134 282.185C115.045 278.837 121.206 273.078 124.42 264.373C126.964 257.676 127.232 254.06 127.232 222.989V188.837H99.1074H70.9825V223.391C70.9825 248.435 70.5807 258.346 69.3754 259.551C67.2325 261.694 60.9379 261.56 59.0629 259.283C57.9915 258.078 57.5897 245.757 57.8576 216.828L58.2594 176.114L92.8128 175.712L127.232 175.444V101.115C127.232 34.5523 126.964 26.2488 124.955 21.1596C121.607 12.5882 118.259 8.70427 110.625 4.41857L103.795 0.668594L65.6254 0.400738C44.5987 0.26681 25.9827 0.668594 24.1078 1.20431ZM68.8397 27.5881C70.7147 28.2577 70.9825 34.5523 70.9825 84.2396C70.9825 125.891 70.5807 140.489 69.3754 141.695C66.9647 144.105 59.3308 143.704 58.3933 141.159C57.9915 139.954 57.5897 114.507 57.5897 84.5074C57.5897 43.9273 57.9915 29.597 59.1969 28.3917C60.9379 26.6506 65.4915 26.2488 68.8397 27.5881Z"
                  fill="black"
                  fillOpacity="0.9"
                />
                <path
                  d="M168.616 1.87516C158.973 5.35729 154.688 8.70549 150.67 16.0715L146.652 23.4376L146.25 98.705L145.848 174.106H179.866C204.375 174.106 214.152 174.508 215.357 175.714C216.562 176.919 216.964 188.169 216.964 217.901C216.964 256.606 216.83 258.481 214.419 259.82C210.535 261.829 206.919 261.427 204.509 258.749C202.5 256.606 202.232 252.052 202.232 222.588V188.838H173.973H145.848L146.25 224.597C146.652 259.82 146.652 260.624 150 267.186C154.42 276.026 162.857 281.784 174.509 283.793C185.223 285.668 234.241 285.668 243.884 283.927C259.419 280.981 268.526 272.945 271.741 259.418C272.678 255.133 273.214 234.106 273.214 198.08V143.303H239.33C214.821 143.303 205.044 142.901 203.839 141.696C201.562 139.419 201.562 30.6697 203.839 28.3929C204.777 27.4554 207.321 26.7858 209.598 26.7858C211.875 26.7858 214.419 27.4554 215.357 28.3929C216.562 29.5982 216.964 42.8571 216.964 79.9551V129.91H245.089H273.348L272.946 77.2766C272.544 40.4464 271.874 23.3036 270.803 19.8215C268.794 14.0626 262.633 7.63406 255.133 3.61623C250.044 0.803741 247.901 0.669813 211.607 0.401958C182.545 0.134102 172.232 0.401958 168.616 1.87516Z"
                  fill="black"
                  fillOpacity="0.9"
                />
                <path
                  d="M289.151 2.27709C287.678 4.01815 287.41 9.64312 287.678 29.3305C288.348 61.7411 286.473 59.7321 312.187 57.0536C322.767 55.8482 336.026 54.6429 341.651 54.1072C357.588 52.9018 357.588 52.9018 357.588 26.2502C357.588 6.83064 357.321 4.15208 355.178 2.27709C353.035 0.268172 348.615 0.000316587 321.83 0.000316587C294.776 0.000316587 290.758 0.268172 289.151 2.27709Z"
                  fill="#0061B2"
                  fillOpacity="0.9"
                />
                <path
                  d="M350.892 61.2031C347.544 61.471 336.294 62.5424 325.713 63.6138C315.267 64.6853 304.017 65.6228 300.669 65.6228C297.321 65.6228 294.642 66.0245 294.642 66.6942C294.642 67.2299 299.463 69.9084 305.356 72.7209C317.008 78.078 322.499 78.7477 338.838 76.337C343.66 75.6673 355.579 74.1941 365.49 72.9888C375.401 71.9174 383.704 70.712 383.972 70.4442C384.91 69.6406 361.874 60.2656 359.329 60.5335C357.99 60.6674 354.24 60.9353 350.892 61.2031Z"
                  fill="#0061B2"
                  fillOpacity="0.9"
                />
                <path
                  d="M291.964 186.829V285.266H320.088H348.213V186.829V88.3917H320.088H291.964V186.829Z"
                  fill="black"
                  fillOpacity="0.9"
                />
              </svg>
              <div className="school-name">
                <div className="school-name-ar">المـدرسة الـوطنیة العلیا للإعلام</div>
                <div className="school-name-fr">Ecole nationale Supérieure d'Informatique</div>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>المبلغ المستلم عند المغادرة - استلمت مبلغ:</label>
            <input type="text" name="avance" defaultValue="" />
          </div>

          <div className="form-group">
            <label>كمقدمة حسب الحالة رقم:</label>
            <input type="text" name="etat_numero" defaultValue="" />
            <span style={{ margin: "0 5px" }}>لهذا اليوم:</span>
            <input type="text" name="date_etat" defaultValue="" />
          </div>

          <div className="form-group">
            <label>في:</label>
            <input type="text" name="lieu_avance" defaultValue="" />
            <span style={{ margin: "0 5px" }}>بتاريخ:</span>
            <input type="text" name="date_avance" defaultValue="" />
          </div>

          <h3 style={{ margin: "10px 0", textAlign: "center", fontSize: "14px" }}>تنفيذ الرحلة</h3>

          <table className="travel-table">
            <thead>
              <tr>
                <th colSpan={9}>المسارات - التواريخ - الأوقات</th>
              </tr>
              <tr>
                <th colSpan={2}>المغادرة من المقر</th>
                <th colSpan={2}>الوصول إلى الوجهة</th>
                <th colSpan={2}>العودة إلى المقر</th>
                <th colSpan={2}>الوصول إلى المقر</th>
                <th rowSpan={2}>وسيلة النقل</th>
              </tr>
              <tr>
                <th>التاريخ</th>
                <th>الساعة</th>
                <th>التاريخ</th>
                <th>الساعة</th>
                <th>التاريخ</th>
                <th>الساعة</th>
                <th>التاريخ</th>
                <th>الساعة</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>من: الجزائر</td>
                <td></td>
                <td>إلى: {mission.destination}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>{mission.transport}</td>
              </tr>
              <tr>
                <td>من: ........</td>
                <td></td>
                <td>إلى: ........</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>من: ........</td>
                <td></td>
                <td>إلى: ........</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>

          <div className="form-group">
            <label>المدة الإجمالية للرحلة:</label>
            <input type="text" name="jours" placeholder="أيام" style={{ width: "80px" }} />
            <input type="text" name="heures" placeholder="ساعات" style={{ width: "80px" }} />
          </div>

          <div className="form-group">
            <label>عدد الليالي التي تكفلت بها مصلحة الاستقبال:</label>
            <input type="text" name="nuitees" defaultValue="" />
          </div>

          <div className="certification">
            <p>
              أنا<sup>(2)</sup> السيد(ة): <input type="text" name="nom_certif" style={{ width: "200px" }} /> أشهد بصحة
              المعلومات المذكورة أعلاه
            </p>
            <div style={{ marginTop: "5px" }}>
              <span>
                في: <input type="text" style={{ width: "120px" }} />
              </span>
              <span style={{ marginRight: "20px" }}>
                بتاريخ: <input type="text" style={{ width: "120px" }} />
              </span>
            </div>
            <div style={{ marginTop: "5px", fontWeight: "bold" }}>التوقيع</div>
            <div style={{ height: "30px" }}></div>
          </div>

          <div style={{ marginTop: "15px", fontSize: "12px" }}>
            <p>
              أشهد<sup>(3)</sup> بصحة الخدمة المنجزة ودقة المعلومات المذكورة أعلاه
            </p>
            <div style={{ marginTop: "5px" }}>
              <span>
                حرر في: <input type="text" style={{ width: "120px" }} />
              </span>
              <span style={{ marginRight: "20px" }}>
                بتاريخ: <input type="text" style={{ width: "120px" }} />
              </span>
            </div>
          </div>

          <div className="notes">
            <p>
              <sup>(1)</sup> : الهيئة أو المصلحة المستقبلة
            </p>
            <p>
              <sup>(2)</sup> : اسم ولقب المكلف بالمهمة
            </p>
            <p>
              <sup>(3)</sup> : رئيس المصلحة أو الهيئة المستقبلة
            </p>
            <p>(اشطب العبارات غير المناسبة)</p>
            <p>
              <strong>ملاحظة:</strong> يجب على كل إدارة أو مؤسسة أو هيئة ملء الخانة المناسبة.
            </p>
          </div>

          <div className="footer">
            ESI (Ecole nationale Supérieure d'Informatique) BP 68M, 16059, Oued Smar, Algérie
            <br />
            Tél : 023.93.91.32 Fax : 023.93.91.34 ; http://www.esi.dz
          </div>
        </div>
      </div>
    </div>
  )
}
