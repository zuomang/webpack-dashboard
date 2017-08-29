<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1>Dashboard<small>Version 2.0</small></h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active">Dashboard</li>
      </ol>
    </section>
    <section class="content">
      <div class="row">
        <div class="col-md-3 col-sm-6 col-xs-12" v-for="landscape in triggers">
          <div class="info-box">
            <span class="info-box-icon bg-aqua"><i class="fa fa-map-signs"></i></span>
            <div class="info-box-content">
              <span class="info-box-text">{{ landscape.landscape.toUpperCase() }}</span>
              <span class="info-box-number">{{ landscape.data.length }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-for="landscape in triggers">
        <div class="col-md-12">
          <div class="box box-info">
            <div class="box-header with-border">
              <h3 class="box-title">{{ landscape.landscape.toUpperCase() }}</h3>
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
                      <th class="col-md-2">Host Name</th>
                      <th class="col-md-2">Host IP</th>
                      <th class="col-md-4">Trigger Name</th>
                      <th class="col-md-2">Trigger Severity</th>
                      <th class="col-md-2">Start Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="trigger in landscape.data">
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
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'default',
  data: function() {
    return {
      triggers: [],
      triggersUrl: 'api/v1/zabbix/triggers/current'
    }
  },
  methods: {
    getTriggers: function() {
      var vm = this;
      axios.get(this.triggersUrl).then(function(response) {
        vm.triggers = response.data.status != 'error' ? response.data.message : [];
      }).catch(function(err) {
        console.error(err);
      })
    }
  },
  created: function() {
    this.getTriggers();
  },
  mounted: function() {
    setInterval(this.getTriggers, 1000 * 60);
  }
}
</script>
