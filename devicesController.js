var mongoose = require('mongoose'),
  device = mongoose.model('device');

exports.list_all_devices = function(req, res) {
  device.find({}, function(err, device) {
    if (err)
      res.send(err);
    res.json(device);
  });
};




exports.create_a_device = function(req, res) {
  var new_device = new device(req.body);
  new_device.save(function(err, device) {
    if (err)
      res.send(err);
    res.json(device);
  });
};


exports.read_a_device = function(req, res) {
  device.findById(req.params.deviceID, function(err, device) {
    if (err)
      res.send(err);
    res.json(device);
  });
};


exports.update_a_device = function(req, res) {
  device.findOneAndUpdate({_id: req.params.deviceID}, req.body, {new: true}, function(err, device) {
    if (err)
      res.send(err);
    res.json(device);
  });
};


exports.delete_a_device = function(req, res) {


  device.remove({
    _id: req.params.deviceID
  }, function(err, device) {
    if (err)
      res.send(err);
    res.json({ message: 'Device successfully deleted' });
  });
};