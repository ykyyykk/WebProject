<template>
  <div class="min-vh-100">
    <div id="enemy_side" class="mt-3 d-flex justify-content-center">
      <div
        id="enemy_health_bar"
        class="progress col-sm-5 h-auto me-3"
        aria-valuenow="10"
        aria-valuemin="0"
        aria-valuemax="100"
        data-aos="fade-right"
      >
        <div
          id="enemy_health_txt"
          class="progress-bar bg-danger overflow-visible text-black fs-5 healthPercentage"
          role="progressbar"
          :style="{ width: (enemy_health / enemy_max_health) * 100 + '%' }"
        >
          <!-- style="width: 100%" -->
          敵人血量: {{ enemy_health }} / {{ enemy_max_health }}
        </div>
      </div>

      <div
        id="enemy_energy_bar"
        class="progress col-sm-5 h-auto"
        aria-valuenow="10"
        aria-valuemin="0"
        aria-valuemax="100"
        data-aos="fade-left"
      >
        <div
          id="enemy_energy_txt"
          class="progress-bar bg-warning overflow-visible text-black fs-5"
          role="progressbar"
          style="width: 100%"
        >
          敵人能量: {{ enemy_energy }}
        </div>
      </div>
    </div>

    <div style="height: 500px">
      <div
        ref="history_log"
        data-bs-spy="scroll"
        data-bs-target="#navbar-example2"
        data-bs-smooth-scroll="true"
        class="scrollspy-example bg-body-tertiary p-3 rounded-2 mt-5"
        style="width: 750px"
        tabindex="0"
      ></div>
      <div id="consecutive_win_count_txt" class="mt-auto mb-3">
        連續勝利: {{ consecutiveWinCount }}
      </div>
    </div>

    <div id="player_side" class="mb-5 d-flex justify-content-center">
      <div
        id="player_health_bar"
        class="progress col-sm-5 h-auto me-3"
        aria-valuenow="10"
        aria-valuemin="0"
        aria-valuemax="100"
        data-aos="fade-right"
      >
        <div
          id="player_health_txt"
          class="progress-bar bg-danger overflow-visible text-black fs-5"
          role="progressbar"
          :style="{ width: (player_health / player_max_health) * 100 + '%' }"
        >
          玩家血量: {{ player_health }} / {{ player_max_health }}
        </div>
      </div>

      <div
        id="player_energy_bar"
        class="progress col-sm-5 h-auto"
        aria-valuenow="10"
        aria-valuemin="0"
        aria-valuemax="100"
        data-aos="fade-left"
      >
        <div
          id="player_energy_txt"
          class="progress-bar bg-warning overflow-visible text-black fs-5"
          role="progressbar"
          style="width: 100%"
        >
          玩家能量: {{ player_energy }}
        </div>
      </div>
    </div>

    <div id="player_btn_group" class="mb-3 d-flex justify-content-center">
      <div
        @mouseenter="hoverBtn = 'Attack'"
        @mouseleave="hoverBtn = ''"
        :class="{
          hovering: this.hoverBtn == 'Attack' && player_energy >= attack_cost,
        }"
        @click="ActionBtnOnClick('attack', attack_cost)"
        id="attack_btn"
        class="card col-sm-3 border-black me-3"
      >
        <div class="card-body rounded" role="button">
          <h5 class="card-title">攻擊</h5>
          <p class="card-text">
            消耗 {{ attack_cost }} 能量 <br />
            對敵人造成 {{ attack_value }} 點傷害
          </p>
        </div>
      </div>
      <div
        @mouseenter="hoverBtn = 'CounterAttack'"
        @mouseleave="hoverBtn = ''"
        :class="{
          hovering:
            this.hoverBtn == 'CounterAttack' &&
            player_energy >= counterattack_cost,
        }"
        @click="ActionBtnOnClick('counterattack', counterattack_cost)"
        id="counterattack_btn"
        class="card col-sm-3 border-black me-3"
      >
        <div class="card-body rounded" role="button">
          <h5 class="card-title">反擊</h5>
          <p class="card-text">
            消耗 {{ counterattack_cost }} 能量 <br />
            如果敵人攻擊玩家則不造成任何傷害 且對敵人造成
            {{ counterattack_value }} 點傷害
          </p>
        </div>
      </div>

      <div
        @mouseenter="hoverBtn = 'Recover'"
        @mouseleave="hoverBtn = ''"
        :class="{
          // TODO: 不知道為什麼不能這樣用
          // hovering: Useable('Recover', recover_cost),
          hovering: this.hoverBtn == 'Recover' && player_energy >= recover_cost,
        }"
        @click="ActionBtnOnClick('recover', recover_cost)"
        id="recover_btn"
        class="card col-sm-3 border-black me-3"
      >
        <div class="card-body rounded" role="button">
          <h5 class="card-title">回復</h5>
          <p class="card-text">
            消耗 {{ recover_cost }} 能量 <br />
            回復 {{ attack_value }} 點血量
          </p>
        </div>
      </div>
    </div>

    <div class="mb-3 d-flex justify-content-center gap-2">
      <button
        @click="NextGameBtnOnClick()"
        id="next_game_btn"
        class="btn col-sm-5 border-black"
      >
        下一場
      </button>
      <button
        @click="ResetRecordBtnOnClick()"
        id="reset_record_btn"
        class="btn btn-primary col-sm-5 border-black"
      >
        清除紀錄
      </button>
    </div>
  </div>
</template>

<script src="../minigame.js"></script>

<style src="../css/minigame.css"></style>
