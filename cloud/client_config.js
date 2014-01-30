exports.config = {
  // NOTE: If force_cloud_config_updates is set to true, then all the fields are updated and old fields are deleted.
  //       if set to a single name then this field will be updated or deleted
  //       if set to an array of names then these fields will be updated or deleted
  //       if set to false then none of the values below will override user set values.
  "force_cloud_config_updates": ["cam_quality", "cam_quality", "cam_targetWidth", "cam_targetHeight", "debug_mode", "logger", "max_retries", "use_chunking", "timeout", "log_line_limit", "log_email", "white_list"],
  "cam_quality": 50,
  "cam_targetWidth": 2048,
  "cam_targetHeight": 1536,
  "sent_save_max": 5,
  "debug_mode": false,
  "logger" : false,
  "max_retries" : 0,
  "use_chunking" : true,
  "timeout" : 30,
  "log_line_limit": 300,
  "log_email": "logs.enterpriseplc@feedhenry.com",
  "white_list": ["C3CFDCFE0AC5492884D9658A65AF8FB7", "26B5D3CA5182453587DF60BEA924CCB3","60fa12c62cd172f8" , "/^eeb45/", "/^acd5/i"]
};
