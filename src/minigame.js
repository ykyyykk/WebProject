export default {
  data() {
    return {
      consecutiveWinCount: 0,
      player_max_health: "",
      player_health: "",
      player_energy: "",
      enemy_max_health: "",
      enemy_health: "",
      enemy_energy: "",
      player_action: "",
      enemy_action: "",
      history_log: "",
      attack_value: 6,
      counterattack_value: 8,
      recover_value: 3,
      attack_cost: 2,
      counterattack_cost: 3,
      recover_cost: 1,
      default_health: 15,
      default_increase_health: 10,
      default_energy: 2,
      default_recover_energy: 2,
      hoverBtn: "",
    };
  },
  mounted() {
    this.LoadData();
    this.UpdateLog("遊戲開始");
  },
  methods: {
    AttackBtnOnClick() {
      if (!this.IsPlaying) return;
      if (this.player_energy < this.attack_cost) return;

      this.player_energy -= this.attack_cost;
      this.player_action = "attack";
      this.enemy_action = this.GetRandomAction();
      this.UpdateLog(`===========================================`);
      this.UpdateLog(`玩家使用: ${this.player_action}`);
      this.CheckResult();
    },
    CounterAttackBtnOnClick() {
      if (!this.IsPlaying) return;
      if (this.player_energy < this.counterattack_cost) return;

      this.player_energy -= this.counterattack_cost;
      this.player_action = "counterattack";
      this.enemy_action = this.GetRandomAction();
      this.UpdateLog(`===========================================`);
      this.UpdateLog(`玩家使用: ${this.player_action}`);
      this.CheckResult();
    },
    RecoverBtnOnClick() {
      if (!this.IsPlaying) return;
      if (this.player_energy < this.recover_cost) return;

      this.player_energy -= this.recover_cost;
      this.player_action = "recover";
      this.enemy_action = this.GetRandomAction();
      this.UpdateLog(`===========================================`);
      this.UpdateLog(`玩家使用: ${this.player_action}`);
      this.CheckResult();
    },
    NextGameBtnOnClick() {
      // 為了避免 文字 + 數字的情況 變數前面+號 強制數字運算
      if (+this.player_health <= 0) {
        this.consecutiveWinCount = 0;
        this.player_health = +this.default_health;
        this.player_energy = +this.default_energy;
      } else {
        this.consecutiveWinCount++;
        this.player_max_health =
          +this.player_max_health + +this.default_increase_health;
        this.player_health =
          +this.player_health + +this.default_increase_health;
      }

      var multiplier = Math.floor(+this.consecutiveWinCount / 5);
      this.enemy_max_health =
        +this.default_health + this.default_increase_health * +multiplier;
      this.enemy_health = +this.enemy_max_health;
      this.enemy_energy = +this.default_energy;

      this.SaveResult();
      this.ClearLog();
    },
    ResetRecordBtnOnClick() {
      this.enemy_max_health = this.default_health;
      this.enemy_health = this.default_health;
      this.enemy_energy = this.default_energy;
      this.player_max_health = this.default_health;
      this.player_health = this.default_health;
      this.player_energy = this.default_energy;
      this.consecutiveWinCount = 0;

      localStorage.setItem("enemy_max_health", this.default_health);
      localStorage.setItem("enemy_health", this.default_health);
      localStorage.setItem("enemy_energy", this.default_energy);
      localStorage.setItem("player_max_health", this.default_health);
      localStorage.setItem("player_health", this.default_health);
      localStorage.setItem("player_energy", this.default_energy);
      localStorage.setItem("consecutiveWinCount", 0);
      this.ClearLog();
    },
    GetRandomAction() {
      const actions = [];

      if (this.enemy_energy >= this.recover_cost) {
        actions.push("recover");
      }
      if (this.enemy_energy >= this.attack_cost) {
        actions.push("attack");
      }
      if (this.enemy_energy >= this.counterattack_cost) {
        actions.push("counterattack");
      }

      if (actions.length === 0) {
        return null; // If no actions can be performed, return null
      }

      const randomIndex = Math.floor(Math.random() * actions.length);
      const selectedAction = actions[randomIndex];

      // Decrease the corresponding cost based on the selected action
      switch (selectedAction) {
        case "recover":
          this.enemy_energy -= this.recover_cost;
          break;
        case "attack":
          this.enemy_energy -= this.attack_cost;
          break;
        case "counterattack":
          this.enemy_energy -= this.counterattack_cost;
          break;
      }

      return selectedAction;
    },
    UpdateLog(text) {
      this.$refs.history_log.innerText += `${text}\n`;
      this.$refs.history_log.scrollTop = this.$refs.history_log.scrollHeight;
    },
    ClearLog() {
      this.$refs.history_log.innerHTML = "";
    },
    CheckResult() {
      // 回復動作要先 這樣才不會永遠打不死
      this.UpdateLog(`敵人使用: ${this.enemy_action}`);
      if (this.player_action == "recover") {
        this.player_health += +this.recover_value;
        this.UpdateLog(
          `玩家回復: ${this.recover_value} 點血量 剩餘血量: ${this.player_health}`
        );
      }

      if (this.enemy_action == "recover") {
        this.enemy_health += +this.recover_value;
        this.UpdateLog(
          `敵人回復: ${this.recover_value} 點血量 剩餘血量: ${this.enemy_health}`
        );
      }

      if (
        this.enemy_action == "attack" &&
        this.player_action != "counterattack"
      ) {
        this.player_health =
          this.player_health >= this.attack_value
            ? +this.player_health - +this.attack_value
            : 0;
        this.UpdateLog(
          `玩家受到: ${this.attack_value} 點傷害 剩餘血量: ${this.player_health}`
        );
      }

      if (
        this.player_action == "attack" &&
        this.enemy_action != "counterattack"
      ) {
        this.enemy_health =
          this.enemy_health >= this.attack_value
            ? +this.enemy_health - +this.attack_value
            : 0;
        this.UpdateLog(
          `敵人受到: ${this.attack_value} 點傷害 剩餘血量: ${this.enemy_health}`
        );
      }

      if (
        this.player_action == "counterattack" &&
        this.enemy_action == "attack"
      ) {
        this.enemy_health =
          this.enemy_health >= this.counterattack_value
            ? +this.enemy_health - +this.counterattack_value
            : 0;
        this.UpdateLog(`玩家反擊 玩家剩餘血量: ${this.player_health}`);
        this.UpdateLog(
          `敵人受到: ${this.counterattack_value} 點傷害 剩餘血量: ${this.enemy_health}`
        );
      }

      if (
        this.enemy_action == "counterattack" &&
        this.player_action == "attack"
      ) {
        this.player_health =
          this.player_health >= this.counterattack_value
            ? +this.player_health - +this.counterattack_value
            : 0;
        this.UpdateLog(`敵人反擊 敵人剩餘血量: ${this.enemy_health}`);
        this.UpdateLog(
          `玩家受到: ${this.counterattack_value} 點傷害 剩餘血量: ${this.player_health}`
        );
      }
      if (
        this.enemy_action == "counterattack" &&
        this.player_action == "counterattack"
      ) {
        this.UpdateLog(`雙方都使用 反擊 沒有發生任何事`);
      }
      this.player_energy += +this.default_recover_energy;
      this.enemy_energy += +this.default_recover_energy;
      this.CheckHealth();
    },
    SaveResult() {
      localStorage.setItem("enemy_max_health", this.enemy_max_health);
      localStorage.setItem("enemy_health", this.enemy_health);
      localStorage.setItem("enemy_energy", this.enemy_energy);
      localStorage.setItem("player_max_health", this.player_max_health);
      localStorage.setItem("player_health", this.player_health);
      localStorage.setItem("player_energy", this.player_energy);
      localStorage.setItem("consecutiveWinCount", this.consecutiveWinCount);
    },
    LoadData() {
      this.UpdateLog("LoadData");
      this.consecutiveWinCount = this.GetLocalStorage("consecutiveWinCount", 0);
      this.player_max_health = this.GetLocalStorage(
        "player_max_health",
        this.default_health
      );
      this.player_health = this.GetLocalStorage(
        "player_health",
        this.default_health
      );
      this.player_energy = this.GetLocalStorage(
        "player_energy",
        this.default_energy
      );
      this.enemy_max_health = this.GetLocalStorage(
        "enemy_max_health",
        this.default_health
      );
      this.enemy_health = this.GetLocalStorage(
        "enemy_health",
        this.default_health
      );
      this.enemy_energy = this.GetLocalStorage(
        "enemy_energy",
        this.default_energy
      );
    },
    GetLocalStorage(name, defaultValue) {
      return localStorage.getItem(name) == null
        ? defaultValue
        : +localStorage.getItem(name);
    },
    Useable(actionName, cost) {
      return this.hoverBtn == actionName && player_energy >= cost;
    },
    CheckHealth() {
      if (this.player_health <= 0 && this.enemy_health <= 0) {
        this.UpdateLog(`雙方平手`);
      }
      if (this.enemy_health <= 0) {
        this.UpdateLog(`玩家勝利 剩餘血量: ${this.player_health}`);
      }
      if (this.player_health <= 0) {
        this.UpdateLog(`敵人勝利 剩餘血量: ${this.enemy_health}`);
      }
    },
  },
  computed: {
    IsPlaying() {
      if (this.player_health <= 0 || this.enemy_health <= 0) {
        return false;
      }
      return true;
    },
  },
};
