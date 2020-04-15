# Foorumi
Alusta keskustelulle ja äänestyksille


## Projektisuunnitelma
Harjoitustyö: Äänestys ja Keskustelu / Mielipidesivusto

Ohjelman Rakenne:

  Etusivu: lista äänestyksistä

  Äänestyksen jälkeen vaalin tulos

  Äänestettävä asia:
  - keskustelu -ketju (*)
  - äänestys (*)
  - äänestys aika

  Asialistan ylläpito (*)
  - CRUD

  Sisäänkirjautuminen

  Käyttäjien hallinta

 (*) = vain sisään kirjautuneille

Harjoitustyö on alustavasti päätetty toteuttaa FullStack -tekniikoin:

  Käyttöliittymä: React
  Palvelin:       Express
  Tietokanta:     MongoDB/Mongoose?
  Tiedonvälitys:  JSON
  Ulkoasu:        Bootstrap/Material UI/Semantic UI React/SaSS ?
  Tietoturva:     salasanasuojaus: bcrypt ?
                  tarkistukset: Owasp?

Ohjelmointi periaatteet:

  Restful eli tilaton
  Modulaarinen/Funktionaalinen
  Käytettävyys
  Tietoturva
  Plain JavaScript

Käyttäjän hallinta

  Session hallinta
  Salasana

Tietokannan taulut:

  Äänestettävät asiat

    Äänestettävät vaihtoehdot ?

    Keskustelu
    Annetut äänet

  Käyttäjät

    Käyttäjä rooli ? ylläpito/osallistuminen

Testaus

    Kirjastot: Jest?
    ELint

Hallinto:

  Projektidokumentit/työkalut ?
  Suunnitteludokumentit/työkalut ?
  Projektiaikataulu
  Dokumentointi
  Version hallinta/GitHub?
