<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:template match="/">
        <xsl:result-document href="site/index.html">
            <html>
                <head>
                    <title>Arqueossítios do NW português</title>
                </head>
                <body>
                    <h2>Arqueossítios do NW português</h2>
                    <h3>Índice de arqueossítios</h3>
                    <ol>
                        <xsl:apply-templates select="//ARQELEM" mode="indice">
                            <xsl:sort select="IDENTI"/>
                        </xsl:apply-templates>
                    </ol>
                </body>
            </html>  
        </xsl:result-document>
        
        
        <xsl:apply-templates/>
        
    </xsl:template>
    
    
    <!-- Templates de índice ........................................ -->
    
    <xsl:template match="ARQELEM" mode="indice">
        <li>
            <a name="i{generate-id()}"/>
            <a href="{generate-id()}.html"> <!-- para a pag do doc que vamos gerar -->
                <xsl:value-of select="IDENTI"/><!-- nos mesmos nodos para a bookmark e para o link. neste caso no doc -->
            </a>
        </li>
    </xsl:template>
    
    <!-- Templates para o conteúdo ............................................................ -->
    <xsl:template match="ARQELEM">
        <xsl:result-document href="site/{generate-id()}.html">
            <html>
                <head>
                    <title><xsl:value-of select="IDENTI"/></title>
                </head>
                <body>
                    <p><b>Tipo: </b> <xsl:value-of select="TIPO"/></p>
                    <p><b>Identificação: </b> <xsl:value-of select="IDENTI"/></p>
                    <p><b>Imagem:</b> <xsl:value-of select="IMAGEM"/></p>
                    <p><b>Descrição: </b> <xsl:value-of select="DESCRI"/></p>
                    <p><b>Lugar: </b> <xsl:value-of select="LUGAR"/></p>
                    <p><b>Freguesia: </b> <xsl:value-of select="FREGUE"/></p>
                    <p><b>Concelho: </b> <xsl:value-of select="CONCEL"/></p>
                    <p><b>CODADM: </b> <xsl:value-of select="CODADM"/></p>
                    <p><b>Longitude: </b> <xsl:value-of select="LONGIT"/></p>
                    <p><b>Latitude: </b> <xsl:value-of select="LATITU"/></p>
                    <p><b>Altitude: </b> <xsl:value-of select="ALTITU"/></p>
                    <p><b>Acesso: </b> <xsl:value-of select="ACESSO"/></p>     
                    <p><b>Quadro: </b> <xsl:value-of select="QUADRO"/></p>
                    <p><b>DESARQ: </b> <xsl:value-of select="DESARQ"/></p>
                    <p><b>INTERP: </b> <xsl:value-of select="INTERP"/></p>
                    <p><b>Deposito: </b> <xsl:value-of select="DEPOSI"/></p>
                    <p><b>Bibliografia: </b> <xsl:value-of select="BIBLIO"/></p>
                    <p><b>Autor: </b> <xsl:value-of select="AUTOR"/></p>
                    <p><b>Data: </b> <xsl:value-of select="DATA"/></p>
                    <p><b>Trabalhos: </b> <xsl:value-of select="TRAARQ"/></p>
                    <p><b>Interesse: </b> <xsl:value-of select="INTERE"/></p>
                    <p><b>Cronologia: </b> <xsl:value-of select="CRONO"/></p>
                    
                    
                    <address>
                        [<a href="index.html#{generate-id()}">Voltar à pagina principal</a>]
                    </address>
                </body>
            </html>
            
            
        </xsl:result-document>
    </xsl:template>
    
    
</xsl:stylesheet>