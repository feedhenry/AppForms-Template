exports.config = {
  // Default client config values.
  // NOTE: If force_cloud_config_updates is set to true,
  // any fields modified by the client will be overridden by any config changs below if they are modified
  // If it is set to false, any fields modified by the client will never be overridden by cloud changes below
  "force_cloud_config_updates": true,
  "cam_quality": 50,
  "cam_targetWidth": 2048,
  "cam_targetHeight": 1536,
  "default_sent_save_max": 5,
  "debug_mode": false,
  "logger": true,
  "max_retries" : 0,
  "use_chunking" : true,
  "default_timeout" : 30,
  "log_line_limit": 300,
  "log_email": "jim.oleary+eplc@feedhenry.com"
};
