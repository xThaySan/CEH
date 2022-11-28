<?php

$language="en";
if ( isset($_GET["lang"]) ){
    $language = $_GET["lang"];
}
include($language."_lang.php");
?>

<html>
<head>
  <title><?php echo $lang["title"]; ?></title>
  <link rel='stylesheet' property='stylesheet' id='s' type='text/css' href='/styles/default.css' media='all' />
</head>

<body>
<h3 class="lang">
    <?php echo $lang['lang']; ?> : 
    <a href="?lang=fr" style="text-decoration:<?php ($language=="fr")?print "underline":print "none"; ?>">Français</a>
    |
    <a href="?lang=en" style="text-decoration:<?php ($language=="en")?print "underline":print "none"; ?>">English</a>
</h3>

<h1><?php echo $lang["welcome"]; ?></h1>

</body>
</html>