const messages = {
    introMessages: {
        "1": [
            "Ahoy! Didn’t expect company… but I suppose I could use some help",
            "See, I’ve run into a bit of a… situation. Lost my way to a valuable treasure ",
            "nine pieces of a key, scattered across the seas. and you are going to help me find it ",
            "But first I need a favor.I’ve got this old photograph of me and my mates and well, its in pieces" ,
            "Help me put it back together, and I might just hand you the first piece of the key"
        ],
        "2": [
            "Well, well… a little birdy told me you’d come sniffin’ around for the key.",
            "The Thing is… the key is in my master’s possession, but I’m not exactly known for loyalty",
            "I’ll steal it for you…if you help me count my Master's possesions that I dropped in the foreshore ",
            "I’d do it myself, but… the ocean? Its depths? The things that lurk down there."
        ],
        "3": [
            "Well, look who’s wandered into sunreef! Lucky you, I’d love to hand over the key right away",
            "Small problem though… my monkey had the key tied ‘round his neck.",
            "And the little rascal ran off into the Enchanted Woods",
            "Find my monkey, and I’ll give you the key — seems fair to me!",
        ],
        "4": [
            "Oh!! look who’s bold enough to face the heat.",
            "I’m Vulcan — master of fire and lava. you have to cross this pit of lava to reach the key.",
            "To get your treasure, you must jump over 6 levitating stones",
            "step wrong, and you’ll burn. and then you will need 30 seconds to cool down before you can start again"
        ],
        "5": [
            "Ah, greetings. I am Commodore Norrington and I heard you want THE KEY?",
            "Years ago, Jack entrusted me with a piece of the key",
            "The key is not to be handed over unless you prove you were sent by Jack himself",
            "Prove it by giving me the code word - a five-letter word related to the sea and the pirate life.!!",
            "And if it’s wrong altogether — it’s as red as your blood"
        ],
        "6": [
            "You can call me Daggerfin, if you make it out alive",
            "This island’s haunted by a monster. We watched it through a glass chamber..until it shattered",
            "Help me fix it, and I’ll give you the key.",
            "But mind you, you can only slide the glass pieces. don’t lift them, or the water will seep in!"
        ],
        "7": [
            "This island’s cursed. everyone ends up dead or worse. You want the key?",
            "Granny’s there too. She’s kind of blind! she can only see moving objects.",
            "you just have to grab the keys from her room. but careful!!or you will end up dead",
        ],
        "8": [
            "Ahoy… I am BloodEye Barbosa. Don’t mind the eye.it’s seen things you’d rather not.",
            "You want the key? It’s locked in a safe. but the code’s long forgotten.",
            "Let's see if you are as sharp as you think!",
            "Crack the code or else you will leave empty handed",
            "and don't think I am not watching...I can do that with the good eye ofcourse"
        ],
        "9": [
            "Ah… so you’ve made it this far. I am Davy Jones — ruler of the seas, master of the tides",
            "it’s worth more than life itself. It sings to me, it haunts me.",
            "But the sea is cruel, it takes its due . go back now, Soon you’ll wear the crown the sea gave me too"
        ],
    },
    connectMessages: {
        "1": [
            "if you can figure out just the corners first it might help...",
            "look for the shape of the puzzle pieces and see if it fits the corners and edges",
            "Come on, love — even I could piece this together… and I’m usually half drunk",
            "oh yes — nothing screams 'treasure hunter' like fumbling over a child's puzzle.",
            "Still fumbling? Even a sloth works faster than this"
        ],
        "2": [
            "See those tiny objects? Tap the icon on the top right and left",
            "Got the list open? Use the arrows to adjust the count — don’t get greedy now.",
            "Sure about that count? Lock it in — or don’t",
            "click the icon in the top right corner to check the list of items. keep track of all the items",
            "Easy enough? Or should I call a mermaid to help you?"
        ],
        "3": [
            "Tap the left side of the dot to go left. Simple enough, right?",
            "Keep tapping — the dot will follow wherever you tap. Just… don't hit a dead end",
            "Lost already? Remember — tap the sides of the dot to navigate.",
            "At this rate, the monkey will come back on his own — just to laugh at you",
            "Think before you tap — wrong turns will only make this longer",
            "you can also swipe to check the maze.",
            "Almost there , I beleive my monkey might’ve evolved into a homo sapien by now"
        ],
        "4": [
            "Almost there — try not to melt at the finish line",
            "Three stones, one path forward. Tap wisely",
            "Step carefully — tap the right box below to step on the correct stone",
            "but watch your step. One wrong answer, and you’ll be stuck waiting",
            "Keep going, or should I start preparing a lava bath in your honor?",
            "Hey btw where to scatter your ashes? River Panjara?",
            "Still alive? Impressive. I was sure you’d be barbecue by now.",
        ],
        "5": [
            "All red? Completely wrong. Embarrassing, really.",
            "A bit slow, are we? Perhaps you’d prefer a simpler word… like ‘failure'.",
            "No greens? That’s… unfortunate.",
            "Ah, that one’s green — means it’s in the right place. Try not to ruin it",
            "Yellow, hmm? It exists, just not where it belongs. Adjust accordingly.",
            "struggling with English vocabulary? Jack did say colonization left a mark",
            "That’s two greens now — don’t go backwards from here.",
            "Letters in the right place will glow green. Correct letters in the wrong place will turn yellow",
            
        ],
        "6": [
            "Careful — the monster might get impatient… and hungry.",
            "Think! The eye piece won’t make sense unless it’s next to the jaw.",
            "Focus on one section at a time — don’t chase the whole picture",
            "Got an empty space? Use it to your advantage",
            "Patterns, patterns — the pieces are trying to tell you something",
            "If it’s stuck, rethink your moves — there’s always a way out",
            "Ah, struggling? Maybe the monster should give you a mask.",
            "Don’t just slide randomly — visualize where each piece should end up."
        ],
        "7": [
            "You guys are so sweet — Granny’s diabetes is acting up already",
            "when Granny’s eyes are closed to fill the progress bar at the top. Get it to 100%, and you win.",
            "Eyes closed = safe to move. Eyes open = danger.",
            "Watch Granny’s eyes closely. Move when they’re shut, stop when they’re open",
            "The key is within reach — just don’t get caught moving while Granny’s awake, or it’s game over",
            "Eyes closed — MOVE, MOVE, MOVE",
            "Slow and steady — each successful ‘Move’ will raise the bar at the top",
            "One wrong click, and you’ll start from scratch.",
            "Keep moving — or Granny might tuck you in… permanently"
        ],
        "8": [
            "Seriously? Even with one eye, I can see you’re struggling",
            "You cracking the code? Or just cracking under pressure, rotten eggs!!",
            "At this rate, the treasure’s going to retire before you find i!"
        ]
    },
    outroMessages: {
        "1": "Didn’t think you’d manage it. yet here we are. Here your reward. our first key",
        "2": "Well done mate!. Here’s our reward",
        "3": "I was about to write your name on the missing persons list. but hey, you made it",
        "4": "Well, there goes Vulcan’s barbeque party. anyways... congratutions we have our key",
        "5": "Wow, you cracked it? Guess Commodore’s getting soft .must be the powdered wig",
        "6": "Well, you’ve got steadier hands than Daggerfin — . Here’s our reward",
        "7": "Granny didn’t chew you up? Impressive. Here’s our key, let's go to the next island",
        "8": "Impressive! Blood-Eye might just shed a tear… if he still had the other eye",
    }
}

module.exports = messages;