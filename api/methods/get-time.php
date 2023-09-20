
<?php
$d = new DateTimeImmutable("now");
$tzo = new DateTimeZone("-06:00");
$local = $d->setTimezone($tzo);
echo $local->format(DateTimeInterface::RFC2822);
?>
