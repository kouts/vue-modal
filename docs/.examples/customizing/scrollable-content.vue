<template>
  <div>
    <div class="row">
      <div class="col text-center pt-2">
        <button type="button" class="btn btn-primary" @click="showModal = true">Open modal</button>
      </div>
    </div>

    <Modal v-model="showModal" title="Modal with scrollable content" modal-class="scrollable-modal">
      <div class="scrollable-content">
        <p>
          What follows is just some placeholder text for this modal dialog. Sipping on Rosé, Silver Lake sun, coming up all
          lazy. It’s in the palm of your hand now baby. So we hit the boulevard. So make a wish, I'll make it like your birthday
          everyday. Do you ever feel already buried deep six feet under? It's time to bring out the big balloons. You could've
          been the greatest. Passport stamps, she's cosmopolitan. Your kiss is cosmic, every move is magic.
        </p>
        <p>
          We're living the life. We're doing it right. Open up your heart. I was tryna hit it and quit it. Her love is like a
          drug. Always leaves a trail of stardust. The girl's a freak, she drive a jeep in Laguna Beach. Fine, fresh, fierce, we
          got it on lock. All my girls vintage Chanel baby.
        </p>
        <p>
          Before you met me I was alright but things were kinda heavy. Peach-pink lips, yeah, everybody stares. This is no big
          deal. Calling out my name. I could have rewrite your addiction. She's got that, je ne sais quoi, you know it. Heavy is
          the head that wears the crown. 'Cause, baby, you're a firework. Like thunder gonna shake the ground.
        </p>
        <p>
          Just own the night like the 4th of July! I’m gon’ put her in a coma. What you're waiting for, it's time for you to
          show it off. Can't replace you with a million rings. You open my eyes and I'm ready to go, lead me into the light. And
          here you are. I’m gon’ put her in a coma. Come on, let your colours burst. So cover your eyes, I have a surprise. As I
          march alone to a different beat. Glitter all over the room pink flamingos in the pool.
        </p>
        <p>
          You just gotta ignite the light and let it shine! Come just as you are to me. Just own the night like the 4th of July.
          Infect me with your love and fill me with your poison. Come just as you are to me. End of the rainbow looking
          treasure.
        </p>
        <p>
          I can't sleep let's run away and don't ever look back, don't ever look back. I can't sleep let's run away and don't
          ever look back, don't ever look back. Yes, we make angels cry, raining down on earth from up above. I'm walking on air
          (tonight). Let you put your hands on me in my skin-tight jeans. Stinging like a bee I earned my stripes. I went from
          zero, to my own hero. Even brighter than the moon, moon, moon. Make 'em go, 'Aah, aah, aah' as you shoot across the
          sky-y-y! Why don't you let me stop by?
        </p>
        <p>
          Boom, boom, boom. Never made me blink one time. Yeah, you're lucky if you're on her plane. Talk about our future like
          we had a clue. Oh my God no exaggeration. You're original, cannot be replaced. The girl's a freak, she drive a jeep in
          Laguna Beach. It's no big deal, it's no big deal, it's no big deal. In another life I would make you stay. I'm ma get
          your heart racing in my skin-tight jeans. I wanna walk on your wave length and be there when you vibrate Never made me
          blink one time.
        </p>
        <p>
          We'd keep all our promises be us against the world. If you get the chance you better keep her. It's time to bring out
          the big, big, big, big, big, big balloons. I hope you got a healthy appetite. Don't let the greatness get you down,
          oh, oh yeah. Yeah, she's footloose and so fancy free. I want the jaw droppin', eye poppin', head turnin', body
          shockin'. End of the rainbow looking treasure.
        </p>
      </div>
      <div class="row scrollable-modal-footer">
        <div class="col-sm-12">
          <div class="float-right">
            <button class="btn btn-secondary" type="button" @click="showModal = false">Close</button>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      showModal: false
    }
  }
}
</script>

<style>
.scrollable-modal {
  display: flex;
  flex-direction: column;
  height: calc(100% - 50px);
}

.scrollable-modal .vm-titlebar {
  flex-shrink: 0;
}

.scrollable-modal .vm-content {
  padding: 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-height: 0; /* https://moduscreate.com/blog/how-to-fix-overflow-issues-in-css-flex-layouts/ */
}

.scrollable-modal .vm-content .scrollable-content {
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px 15px 10px 15px;
  flex-grow: 1;
}

.scrollable-modal .scrollable-modal-footer {
  padding: 15px 0px 15px 0px;
  border-top: 1px solid #e5e5e5;
  margin-left: 0;
  margin-right: 0;
}
</style>
