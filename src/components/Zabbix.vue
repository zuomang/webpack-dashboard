<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1>{{ $route.params.landscape }}</h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li><a href="#"><i class="fa fa-dashboard"></i> Alerts</a></li>
        <li class="active">{{ $route.params.landscape }}</li>
      </ol>
    </section>
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="box box-info">
            <div class="box-header with-border">
              <h3 class="box-title">Open Alerts</h3>
              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
              </div>
            </div>
            <div class="box-body">
              <div class="table-responsive">
                <table class="table no-margin">
                  <thead>
                    <tr>
                      <th>Host Name</th>
                      <th>Host IP</th>
                      <th>Trigger Name</th>
                      <th>Trigger Severity</th>
                      <th>Start Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="trigger in current_triggers">
                      <td class="col-md-2">{{ trigger.host_name }}</td>
                      <td class="col-md-2">{{ trigger.host_conn }}</td>
                      <td class="col-md-4">{{ trigger.trigger_name }}</td>
                      <td class="col-md-2"><span class="label" v-bind:class="trigger.trigger_severity | reverseLabel">{{ trigger.trigger_severity }}</span></td>
                      <td class="col-md-2">{{ trigger.create_time }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="content">
      <div class="row">
        <div class="col-xs-12">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">Alerts History</h3>
            </div>
            <div class="box-body">
              <table id="example" class="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th class="col-md-2">Host Name</th>
                    <th class="col-md-2">Host IP</th>
                    <th class="col-md-4">Trigger Name</th>
                    <th class="col-md-2">Trigger Severity</th>
                    <th class="col-md-2">Start Time</th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'zabbix',
  data: function() {
    return {
      triggers: [],
      triggersBaseUrl: '/api/v1/zabbix/triggers/all/',
      once: true,
    }
  },
  methods: {
    getTriggers: function(landscape) {
      var vm = this;
      axios.get(this.triggersBaseUrl + landscape).then(function(response) {
        vm.triggers = response.data.status != 'error' ? response.data.message : [];
        if(vm.once) {
          vm.once = false;
          $('#example').DataTable({
            data: vm.triggers,
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": true,
            "order": [[4, "desc"]],
            "info": true,
            "autoWidth": false,
            columns: [
              { data: 'host_name' },
              { data: 'host_conn' },
              { data: 'trigger_name' },
              { data: 'trigger_severity' },
              { data: 'create_time' }
            ]
          });
        } else {
          var table = $('#example').DataTable();
          table.clear();
          table.rows.add(vm.triggers);
          table.draw();
        }
      }).catch(function(err) {
        console.error(err);
      });
    }
  },
  mounted: function() {
    this.getTriggers(this.$route.params.landscape);
  },
  computed: {
    current_triggers: function() {
      var result = [];
      this.triggers.forEach(function(item) {
        if (item.trigger_status == "PROBLEM") {
          result.push(item);
        }
      });
      return result;
    }
  },
  watch: {
    '$route': function(to, from) {
      this.getTriggers(to.params.landscape);
    }
  }
}
</script>
