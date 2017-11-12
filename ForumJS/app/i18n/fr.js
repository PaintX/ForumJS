module.exports = {
    local_name: 'Français (vouvoiement)',
    acp: {
        common: {
            'INSTALL': 'Installer',
        },
    },
    install: {
        common: {
            'INTRODUCTION_TITLE': 'Introduction',
            'INTRODUCTION_BODY': 'Bienvenue sur phpBB3 !<br /><br />phpBB® est la solution de forum libre la plus répandue dans le monde. phpBB3 est l’aboutissement d’un long processus débuté en 2000. Comme ses prédécesseurs, phpBB3 est riche en fonctionnalités, convivial et complètement supporté par l’équipe phpBB. phpBB3 améliore considérablement ce qui a rendu populaire phpBB2 et ajoute des fonctionnalités très souvent demandées, qui n’étaient pas présentes dans les versions précédentes. Nous espérons qu’il dépassera vos attentes.<br /><br />Cet outil vous guidera à travers l’installation de phpBB3, la mise à jour de votre forum phpBB3 ou la conversion depuis un autre système de forum (y compris phpBB2). Pour plus d’informations, nous vous invitons à prendre connaissance du <a href="../docs/INSTALL.html">guide d’installation</a> (en anglais).<br /><br />Pour consulter la licence de phpBB3 ou vous renseigner sur l’obtention de support ainsi que notre position, choisissez l’option respective à partir du menu latéral. Pour continuer, choisissez l’option appropriée dans les onglets ci-dessus.',
            'INSTALL_PANEL': 'Assistant d’installation',
            'SELECT_LANG'	: 'Choisissez une langue',
        },
        support:{
            'SUPPORT_TITLE'		:'Support',
            'SUPPORT_BODY'		: 'Un support complet et gratuit est fourni pour l’actuelle version stable de phpBB3. Ceci inclut les questions concernant :</p><ul><li>l’installation</li><li>la configuration</li><li>les questions techniques</li><li>les problèmes liés aux potentiels bugs du logiciel</li><li>la mise à jour depuis une version « Release Candidate » (RC) vers la dernière version stable</li><li>la conversion depuis un forum phpBB 2.0.x vers phpBB3</li><li>la conversion depuis un autre système de forum vers phpBB3 (consultez <a href="https://www.phpbb.com/community/viewforum.php?f=486">le forum des convertisseurs</a>*)</li></ul><p>Nous encourageons les utilisateurs d’une des versions béta de phpBB3 à remplacer celle-ci par la dernière version stable.</p><h2>Extensions / Styles</h2><p>Pour des problèmes liés aux extensions, nous vous invitons à créer votre sujet dans le <a href="https://www.phpbb.com/community/viewforum.php?f=451">forum des extensions</a>*.<br />Pour des problèmes liés aux styles, templates et thèmes, nous vous invitons à créer votre sujet dans le <a href="https://www.phpbb.com/community/viewforum.php?f=471">forum des styles</a>*.<br /><br />Si votre question est en relation avec une archive précise, créez votre message directement dans le sujet dédié à l’archive.</p><h2>Obtention du support</h2><p><a href="https://www.phpbb.com/community/viewtopic.php?f=14&amp;t=571070">Le pack de bienvenue de phpBB</a>*<br /><a href="https://www.phpbb.com/support/">Section de support</a>*<br /><a href="https://www.phpbb.com/support/docs/en/3.1/ug/quickstart/">Guide de démarrage rapide</a>*<br /><br />Pour vous assurer d’être à jour et au courant des dernières nouvelles, nous vous conseillons de souscrire à notre <a href="https://www.phpbb.com/support/">lettre d’informations</a>*.<br /><br />*lien externe amenant sur une page non traduite en français.<br /><br />',
        },
        license:
        {
            // License
            'LICENSE_TITLE'		: 'Licence publique générale',
        },
        items: {
            'MENU_OVERVIEW'		: 'Page d’accueil',
            'MENU_INTRO'		: 'Introduction',
            'MENU_LICENSE'		: 'Licence',
            'MENU_SUPPORT'		: 'Support',
        },
        serverRequirements: {
	'DIRECTORY_NOT_EXISTS'						:'Répertoire inexistant',
	'DIRECTORY_NOT_EXISTS_EXPLAIN'				:'Pour être en mesure d’installer phpBB le répertoire « %1$s » doit exister.',
	'DIRECTORY_NOT_EXISTS_EXPLAIN_OPTIONAL'		: 'Il est recommandé que le répertoire « %1$s » existe pour améliorer votre confort d’utilisation du forum.',
	'DIRECTORY_NOT_WRITABLE'					: 'Répertoire inaccessible en écriture',
	'DIRECTORY_NOT_WRITABLE_EXPLAIN'			: 'Pour être en mesure d’installer phpBB le répertoire « %1$s » doit être accessible en écriture.',
	'DIRECTORY_NOT_WRITABLE_EXPLAIN_OPTIONAL'	: 'Il est recommandé que le répertoire « %1$s » soit accessible en écriture pour améliorer votre confort d’utilisation du forum.',
	
		'PHP_VERSION_REQD'					:'Version de NodeJS',
	'PHP_VERSION_REQD_EXPLAIN'			: 'ForumJS requiert NodeJS version v6 ou supérieure.',
		'PHP_GETIMAGESIZE_SUPPORT'			: 'La fonction NodeJS image-size est requise',
	'PHP_GETIMAGESIZE_SUPPORT_EXPLAIN'	:'Pour que ForumJS fonctionne correctement, la fonction image-size doit être disponible.',
	
            'STAGE_REQUIREMENTS'	: 'Vérifier les prérequis',
        },
        install: {
            'INSTALL_INTRO': 'Bienvenue dans l’assitant d’installation de phpBB',

            'INSTALL_INTRO_BODY'	: 'Cet assistant va vous permettre d’installer phpBB3 sur votre serveur.</p><p>Pour cela, vous aurez besoin des paramètres de connexion à votre base de données. Si vous ne les connaissez pas, contactez votre hébergeur pour les lui demander. Vous ne pourrez pas continuer l’installation sans ces paramètres. Il vous faut :</p>\
            \
                <ul>\
                <li>Le type de votre base de données.</li>\
                <li>L’adresse du serveur de votre base de données ou DSN.</li>\
                <li>Le port du serveur de votre base de données (dans bon nombre de cas cette information n’est pas nécessaire).</li>\
                <li>Le nom de votre base de données.</li>\
                <li>Le nom d’utilisateur et le mot de passe d’accès à votre base de données.</li>\
	</ul>\
            \
            <p><strong>Note :</strong> Si vous faites une installation en utilisant SQLite, vous devrez saisir le chemin complet d’accès à votre base de données dans le champ DSN et laisser les champs nom d’utilisateur et mot de passe vides. Pour des raisons de sécurité, assurez-vous que votre fichier de base de données n’est pas situé dans un répertoire accessible depuis le Web.</p>\
            \
            <p>phpBB3 supporte les bases de données suivantes :</p>\
            <ul>\
                <li>MySQL 3.23 ou supérieur (MySQLi supporté)</li>\
                <li>PostgreSQL 8.3+</li>\
                <li>SQLite 3.6.15+</li>\
                <li>MS SQL Server 2000 ou supérieur (directement ou via ODBC)</li>\
                <li>MS SQL Server 2005 ou supérieur (natif)</li>\
                <li>Oracle</li>\
            </ul>\
\
            <p>Seules les bases de données prises en charge par votre serveur seront proposées.',

            'STAGE_OBTAIN_DATA': 'Définir les données d’installation',
            'STAGE_INSTALL'	: 'Installation de phpBB',
        },
        data : {
        'ADMIN_CONFIG'				: 'Configuration du compte Administrateur',
    },
    },

'NEXT_STEP'					: 'Suivant',


    'CHANGE': 'Modifier',









        'L_SUBMIT': 'Envoyer',

    'L_COLON' : ':',
    'DIRECTION': 'ltr',
    'L_INDEX':'Index du forum',
    'L_SKIP': 'Vers le contenu',
    'L_MCP': 'Panneau de modération',
    'L_SITE_HOME': 'Accueil',
    'L_SEARCH_KEYWORDS': 'Recherche par mots-clés',
    'L_SEARCH': 'Rechercher',
    'L_SEARCH_MINI': 'Recherche...',
    'L_SEARCH_ADV': 'Recherche avancée',
    'L_QUICK_LINKS': 'Accès rapide',
    'L_INFORMATION': 'Informations',
    'L_BOARD_DISABLED': 'Ce forum est actuellement désactivé.',
    'L_MARK_FORUMS_READ': 'Marquer tous les forums comme lus',
    'L_LOGIN': 'Connexion',
    'L_REGISTER': 'S’enregistrer',
    'L_USERNAME': 'Nom d’utilisateur',
    'L_PASSWORD': 'Mot de passe',
    'L_WHO_IS_ONLINE': 'Qui est en ligne',
    'L_LEGEND'							: 'Légende',
}