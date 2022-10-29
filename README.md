# JLCC-Discord-Bot
## About Bot
- Schedule messages (admins)
- Look up kanji
- Search for Japanese words/phrases. Get their part of speech, readings (hiragana), and definition.

## Commands
### Prefix: -j
```
-j ping
-j schedule <Channel tag> <YYYY/MM/DD> <HH:MM> <"AM" OR "PM"> <Timezone>
-j deletesched <messageId>
-j kanji <kanji>
-j search <word/phrase>
```
### Notes:
- Our timezone is "CST6CDT".
- `messageId` is given when a message is scheduled.

### Examples
```
-j schedule #meeting-plans 2022/1/4 6:28 PM CST6CDT
-j deletesched 24
-j kanji 田
-j search 日本
```