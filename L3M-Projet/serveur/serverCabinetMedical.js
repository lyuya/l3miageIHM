"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**_________________________________________________________________________________________________________________________________
 * Get external libraries ---------------------------------------------------------------------------------------------------------
 **/
const fs = require("fs-extra");
const express = require("express");
const bodyParser = require("body-parser");
const xmldom_1 = require("xmldom");
const multer = require("multer");
const staticGzip = require("http-static-gzip-regexp");
// import * as libXML from "libxmljs";
// import * as soap from "soap";
let xmlSerializer = new xmldom_1.XMLSerializer();
let domParser = new xmldom_1.DOMParser();
/**_________________________________________________________________________________________________________________________________
 * Save the XML into a file, file acces is asynchronous ----------------------------------------------------------------------------
 *   - doc : the document containing the XML ---------------------------------------------------------------------------------------
 *   - res : the result stream of a client HTTP request ----------------------------------------------------------------------------
 **/
function saveXML(doc, res) {
    fs.writeFile("./data/cabinetInfirmier.xml", xmlSerializer.serializeToString(doc), function (err) {
        res.setHeader("Content-Type", "text/plain");
        if (err) {
            console.error("Error writing ./data/cabinetInfirmier.xml:\n", err);
            res.writeHead(500);
            res.write(`Error writing ./data/cabinetInfirmier.xml:\n${err}`);
        }
        else {
            res.writeHead(200);
        }
        res.end();
    });
}
/**_________________________________________________________________________________________________________________________________
 * Returns DOM node of patient identified by numlber in document doc or null if there is no such patient ---------------------------
 **/
function getPatient(doc, socialSecurityNumber) {
    const L = Array.from(doc.getElementsByTagName("patient")); // doc.getElementsByTagName('patient');
    return L.find(E => E.getElementsByTagName("numéro")[0].textContent === socialSecurityNumber);
}
function distributeIdInf(doc) {
    const L = Array.from(doc.getElementsByTagName("infirmier"));
    const ids = L.map(ele => ele.getAttribute("id"));
    let idNum;
    const idsNum = ids.map(id => idNum = +id);
    idsNum.sort(function (a, b) {
        return a - b;
    });
    return (idsNum[idsNum.length - 1] + 1).toString();
}
/**_________________________________________________________________________________________________________________________________
 * Define HTTP server, implement some ressources -----------------------------------------------------------------------------------
 *   - port : the TCP port on which the HTTP server will be listening --------------------------------------------------------------
 **/
function init(port, applicationServerIP, applicationServerPort) {
    let doc; // will reference the document representing the XML structure
    const applicationServer = {
        ip: applicationServerIP,
        port: applicationServerPort
    };
    // Read and parse the XML file containing the data
    fs.readFile(__dirname + "/data/cabinetInfirmier.xml").then((dataBuffer) => {
        try {
            const data = dataBuffer.toString();
            doc = domParser.parseFromString(data, "text/xml");
            console.log("/data/cabinetInfirmier.xml successfully parsed !");
        }
        catch (err) {
            console.error("Problem parsing /data/cabinetInfirmier.xml", err);
        }
    }, (err) => {
        console.error("Problem reading file /data/cabinetInfirmier.xml", err);
    });
    // Initialize the HTTP server
    const app = express();
    app.use(staticGzip(/^\/?dist\/.*(\.js|\.css)$/))
        .use(express.static(__dirname)) // Associate ressources for accessing local files
        .use(bodyParser.urlencoded({ extended: false })) // Add a parser for urlencoded HTTP requests
        .use(bodyParser.json()) // Add a parser for json HTTP request
        .use(multer({ dest: "./uploads/" }).array()) // Add a parser for file transmission
        .listen(port); // HTTP server listen to this TCP port
    app.disable("etag");
    // Define HTTP ressource GET /
    app.get("/", (req, res) => {
        // console.log('Getting /');
        fs.readFile(__dirname + "/start.html").then((data) => {
            // Parse it so that we can add secretary and all nurses
            const docHTML = domParser.parseFromString(data.toString());
            const datalist = docHTML.getElementById("logins");
            const L_nurses = Array.from(doc.getElementsByTagName("infirmier"));
            L_nurses.forEach(nurse => {
                const option = docHTML.createElement("option");
                option.setAttribute("value", nurse.getAttribute("id"));
                option.textContent = nurse.getElementsByTagName("prénom")[0].textContent
                    + " "
                    + nurse.getElementsByTagName("nom")[0].textContent;
                datalist.appendChild(option);
            });
            res.writeHead(200);
            res.write(xmlSerializer.serializeToString(docHTML));
            res.end();
        }, (err) => {
            res.writeHead(500);
            return res.end("Error loading start.html : " + err);
        });
    });
    // Define HTTP ressource POST /, contains a login that identify the secretary or one nurse
    app.post("/", (req, res) => {
        switch (req.body.login) {
            case "Secretaire":
                fs.readFile(__dirname + "/secretary.html").then(dataBuffer => {
                    res.writeHead(200);
                    res.write(dataBuffer.toString());
                    res.end();
                }, (err) => {
                    res.writeHead(500);
                    return res.end("Error loading secretary.html : ", err);
                });
                break;
            default:// Is it a nurse ?
                res.writeHead(200);
                res.write("Unsupported login : " + req.body.login);
                res.end();
        }
    });
    //HTTP /deletePatient pour supprimer un patient dans la liste
    app.post("/deletePatient", (req, res) => {
        console.log("/deletePatient, \nreq.body:\n\t", req.body, "\n_______________________");
        let patients = doc.getElementsByTagName("patients")[0];
        let patsNodeList = patients.getElementsByTagName("patient");
        const nirSupprime = req.body.nir;
        const patsEles = Array.prototype.slice.call(patsNodeList);
        for (let patEle of patsEles) {
            let nirEle = patEle.getElementsByTagName("numéro")[0];
            console.log(nirEle.textContent);
            if (nirEle.textContent === nirSupprime) {
                console.log("supprime!");
                patients.removeChild(patEle);
            }
            else {
                console.log("Error à supprimer!");
            }
        }
        saveXML(doc, res);
    });
    //HTTP /deleteInfirmier pour supprimer un infirmier dans la liste
    app.post("/deleteInfirmier", (req, res) => {
        console.log("/deleteInfirmier, \nreq.body:\n\t", req.body, "\n_______________________");
        let infirmiers = doc.getElementsByTagName("infirmiers")[0];
        let infsNodeList = infirmiers.getElementsByTagName("infirmier");
        const idInfSupprime = req.body.id;
        console.log(idInfSupprime);
        //let patsNodeList = patients.getElementsByTagName("patient");
        //const infirmiersElements: Element[] = Array.prototype.slice.call(infirmiersElementNodeList);
        const infsEles = Array.prototype.slice.call(infsNodeList);
        for (let infEle of infsEles) {
            let idInf = infEle.getAttribute("id");
            //console.log(idInf);
            if (idInf === idInfSupprime) {
                console.log("supprime!");
                infirmiers.removeChild(infEle);
            }
            else {
                console.log("Error à supprimer!");
            }
        }
        saveXML(doc, res);
    });
    // Define HTTP ressource PORT /addPatient, may contains new patient information
    app.post("/addPatient", (req, res) => {
        console.log("/addPatient, \nreq.body:\n\t", req.body, "\n_______________________");
        const patient = {
            prénom: req.body.patientForname || "",
            nom: req.body.patientName || "",
            sexe: req.body.patientSex || "F",
            naissance: req.body.naissance || "",
            numéroSécuriteSociale: req.body.patientNumber || "undefined",
            adresse: {
                ville: req.body.patientCity || "",
                codePostal: req.body.patientPostalCode || "",
                rue: req.body.patientStreet || "",
                numéro: req.body.patientStreetNumber || "",
                étage: req.body.patientFloor || ""
            }
        };
        const patients = doc.getElementsByTagName("patients")[0];
        // Is it a new patient or not ?
        let newPatient = getPatient(doc, patient.numéroSécuriteSociale);
        if (!newPatient) {
            newPatient = doc.createElement("patient");
            patients.appendChild(newPatient);
        }
        else {
            while (newPatient.childNodes.length) {
                newPatient.removeChild(newPatient.childNodes[0]);
            }
        }
        // Name
        const nom = doc.createElement("nom");
        nom.appendChild(doc.createTextNode(patient.nom));
        newPatient.appendChild(nom);
        // Forname
        const prénom = doc.createElement("prénom");
        prénom.appendChild(doc.createTextNode(patient.prénom));
        newPatient.appendChild(prénom);
        // Social security number
        const numéro = doc.createElement("numéro");
        numéro.appendChild(doc.createTextNode(patient.numéroSécuriteSociale));
        newPatient.appendChild(numéro);
        // Sex
        const sexe = doc.createElement("sexe");
        sexe.appendChild(doc.createTextNode(patient.sexe));
        newPatient.appendChild(sexe);
        // Birthday
        const naissance = doc.createElement("naissance");
        naissance.appendChild(doc.createTextNode(patient.naissance));
        newPatient.appendChild(naissance);
        // Visites
        const visite = doc.createElement("visite");
        visite.setAttribute("date", "2014-12-08");
        newPatient.appendChild(visite);
        // Adress
        const adresse = doc.createElement("adresse");
        newPatient.appendChild(adresse);
        const etage = doc.createElement("étage");
        etage.appendChild(doc.createTextNode(patient.adresse.étage));
        adresse.appendChild(etage);
        const numAdress = doc.createElement("numéro");
        numAdress.appendChild(doc.createTextNode(patient.adresse.numéro));
        adresse.appendChild(numAdress);
        const rue = doc.createElement("rue");
        rue.appendChild(doc.createTextNode(patient.adresse.rue));
        adresse.appendChild(rue);
        const ville = doc.createElement("ville");
        ville.appendChild(doc.createTextNode(patient.adresse.ville));
        adresse.appendChild(ville);
        const codePostal = doc.createElement("codePostal");
        codePostal.appendChild(doc.createTextNode(patient.adresse.codePostal));
        adresse.appendChild(codePostal);
        console.log(xmlSerializer.serializeToString(newPatient));
        saveXML(doc, res);
    });
    //Define HTTP ressource PORT /addInfirmier, may contains new infirmier information
    app.post("/addInfirmier", (req, res) => {
        console.log("/addInfirmier, \nreq.body:\n\t", req.body, "\n_______________________");
        const infirmier = {
            prénom: req.body.infPrenom || "",
            nom: req.body.infNom || "",
            photo: req.body.infImg || "undefined",
            adresse: {
                ville: req.body.infVille || "",
                codePostal: req.body.infCodepostale || "",
                rue: req.body.infRue || "",
                numéro: req.body.infRueNum || "",
                étage: req.body.infEtage || ""
            }
        };
        const infirmiers = doc.getElementsByTagName("infirmiers")[0];
        // Is it a new patient or not ?
        const newInf = doc.createElement("infirmier");
        newInf.setAttribute("id", distributeIdInf(doc));
        infirmiers.appendChild(newInf);
        // Name
        const nom = doc.createElement("nom");
        nom.appendChild(doc.createTextNode(infirmier.nom));
        newInf.appendChild(nom);
        // Forname
        const prénom = doc.createElement("prénom");
        prénom.appendChild(doc.createTextNode(infirmier.prénom));
        newInf.appendChild(prénom);
        // Social security number
        const photo = doc.createElement("photo");
        photo.appendChild(doc.createTextNode(infirmier.photo));
        newInf.appendChild(photo);
        // Adress
        const adresse = doc.createElement("adresse");
        newInf.appendChild(adresse);
        const etage = doc.createElement("étage");
        etage.appendChild(doc.createTextNode(infirmier.adresse.étage));
        adresse.appendChild(etage);
        const numAdress = doc.createElement("numéro");
        numAdress.appendChild(doc.createTextNode(infirmier.adresse.numéro));
        adresse.appendChild(numAdress);
        const rue = doc.createElement("rue");
        rue.appendChild(doc.createTextNode(infirmier.adresse.rue));
        adresse.appendChild(rue);
        const ville = doc.createElement("ville");
        ville.appendChild(doc.createTextNode(infirmier.adresse.ville));
        adresse.appendChild(ville);
        const codePostal = doc.createElement("codePostal");
        codePostal.appendChild(doc.createTextNode(infirmier.adresse.codePostal));
        adresse.appendChild(codePostal);
        console.log(xmlSerializer.serializeToString(newInf));
        saveXML(doc, res);
    });
    // Define HTTP ressource POST /affectation, associate a patient with a nurse
    app.post("/affectation", (req, res) => {
        if (typeof req.body.infirmier === "undefined"
            || typeof req.body.patient === "undefined") {
            res.writeHead(500);
            res.end("You should specify 'infirmier' with her id and 'patient' with her social security number in your request.");
        }
        else {
            const nurse = doc.getElementById(req.body.infirmier);
            if (nurse || req.body.infirmier === "none") {
                // Get node corresponding to the patient
                const LP = Array.from(doc.getElementsByTagName("patient"));
                LP.forEach(patient => {
                    const node_num = patient.getElementsByTagName("numéro")[0];
                    if (node_num.textContent === req.body.patient) {
                        if (req.body.infirmier === "none") {
                            req.body.infirmier = "";
                        }
                        patient.getElementsByTagName("visite")[0].setAttribute("intervenant", req.body.infirmier);
                        saveXML(doc, res);
                    }
                });
            }
            else {
                res.writeHead(500);
                res.end("There is no nurse identified by id", req.body.infirmier);
            }
        }
    });
    // Define HTTP ressource POST /INFIRMIERE
    app.post("/INFIRMIERE", (req, res) => {
        res.end("INFIRMIERE "
            + req.body.id
            + ". WARNING: You should configure the optimization application server IP and port. "
            + "//By default, the optimization application server is configured to be the HCI one.");
    });
    /*
    app.get ( "/check", (req, res) => {
            const P_xml: Promise<string> = fs.readFile( __dirname + "/data/cabinetInfirmier.xml" ).then(
                dataBuffer => dataBuffer.toString()
            );
            const P_xsd: Promise<string> = fs.readFile( __dirname + "/data/cabinet.xsd" ).then(
            dataBuffer => dataBuffer.toString()
            );
            const P_all = Promise.all( [P_xml, P_xsd] );

            P_all.then	( ([str_xml, str_xsd]) => { // If resolved
                    // Check xml / xsd
                    console.log( "./data/cabinet.xsd" );
                    const xsdDoc = libXML.parseXml(str_xsd); console.log(1);
                    const xmlDoc = libXML.parseXml(str_xml); console.log(2);
                    xmlDoc.validate(xsdDoc); console.log(3);
                    console.log(xmlDoc.validationErrors);
                    res.end( JSON.stringify(xmlDoc.validationErrors) );
                }
                , () => { // If rejected
                    res.end("Error, promises rejected");
                }
            );
        }
    );*/
}
/**_________________________________________________________________________________________________________________________________
 * Parse command line parameters and initialize everything ------------------------------------------------------------------------
 **/
let params = {}, p;
for (let i = 2; i < process.argv.length; i++) {
    p = process.argv[i].split(":");
    params[p[0]] = p[1];
}
const port = params["port"] || "8090", applicationServerIP = params["applicationServerIP"] || "127.0.0.1", applicationServerPort = params["applicationServerPort"] || "8080";
console.log(`Usage :
    node staticServeur.js [port:PORT]
    Default port is 8090.
    Current port is ${port}
`);
console.log("HTTP server listening on port ", port);
init(port, applicationServerIP, applicationServerPort);
//# sourceMappingURL=serverCabinetMedical.js.map