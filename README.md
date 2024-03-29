# JLCC-Discord-Bot
## About Bot
- Schedule messages (admins)
- Delete scheduled messages (admins)
- Edit messages previously sent by the bot (admins)
- Look up kanji
- Search for Japanese words/phrases. Get their part of speech, readings (hiragana), and definition.

## Commands
### Prefix: -j
```
-j ping
-j kanji <kanji>
-j search <word/phrase>
```

## Admin Commands
```
-j schedule <Channel tag> <YYYY/MM/DD> <HH:MM> <"AM" OR "PM"> <Timezone>
-j deletesched <messageId>
-j edit <channelTag> <messageID>
```

### Notes:
- Our timezone is "CST6CDT".
- `messageId` for `-j deletesched` is given when a message is scheduled.
- `messageID` for `-j edit` is found by right clicking a message in Discord (with Developer Mode enabled) and clicking "Copy ID"

### Examples
```
-j schedule #meeting-plans 2022/1/4 6:28 PM CST6CDT
-j deletesched 24
-j edit #announcements 1051950083207348304
-j kanji 田
-j search 日本
```