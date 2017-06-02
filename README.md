# warnme-mongo-support
Do Not Use, untested and will most likely break

Creates a structure where specific mongo ids can be pulled after detecting the location of the character

This is important because it seems that mongos shares the same ids as that of the original mobs. For example, the "keen Hat tuwagi" mongos in 'valley of titans (an example)' shares the same ids as keen hat tuwagis in "tuwagi-mire". What differentiates the mongo from regular mobs is the location where it is spawned in.

This can cause module to fire off when you enter a location where the mobs are. The module will fire off rapidly when entering tuwagi-mire as it is full of keen hat tuwagi mobs. Therefore, this module support attempts to fix this by only pulling ids of mongos which exist in that location only (eg: only pulling tuwagis mongo ids when character enters valley of titans and silences the ids if characters are elsewhere). This is automated using S_Load_Topo to pull character location and matching it to the array which contains the mongo ids.

Global mongos like legendary mongos, mandrakes and the kitty can be put in default ids places, but characters should be advised to not go hunting mongos in places with contains them (TODO: put in an option to silence some of them).

There is also the support to turn off notification of common small mongos added.
