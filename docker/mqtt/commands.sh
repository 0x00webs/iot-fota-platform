cd certs/ca
openssl genrsa -out ca.key 2048
openssl req -x509 -new -nodes -key ca.key -sha256 -days 3650 -out ca.crt -subj "/CN=My-CA"
cd certs/server
openssl genrsa -out server.key 2048
openssl req -new -out server.csr -key server.key -subj "/CN=localhost"
openssl x509 -req -in server.csr -CA ../ca/ca.crt -CAkey ../ca/ca.key -CAcreateserial -out server.crt -days 365 -sha256

# test tls connection
mosquitto_sub -h localhost -p 8883 --cafile ./certs/ca/ca.crt -t "test/topic" -v

# publish message
mosquitto_pub -h localhost -p 8883 --cafile ./certs/ca/ca.crt -t "test/topic" -m "Hello, Secure MQTT!"


# Set ownership to user/group 1883 (standard for Mosquitto containers)
sudo chown -R 1883:1883 ./log ./data

# Ensure certificates are readable (but the key should stay private)
sudo chmod -R 755 ./certs

#sudo chown root:root ./config/passwords
#sudo chmod 0700 ./config/passwords
#chmod 700 config/passwords

chmod -R 755 config
chmod 644 config/passwords

docker run --rm -it \
  -v $(pwd)/config:/mosquitto/config \
  eclipse-mosquitto:2.1.2-alpine \
  mosquitto_passwd -b /mosquitto/config/passwords fota_user fota_password

mosquitto_sub -h localhost -p 8883   --cafile ./certs/ca/ca.crt   -u fota_user -P fota_password   -t "test/topic" -v

mosquitto_pub -h localhost -p 8883 --cafile ./certs/ca/ca.crt -u fota_user -P fota_password -t "test/topic" -m "Hello, Secure MQTT!"