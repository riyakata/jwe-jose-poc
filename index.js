const jose = require('jose');

const publicKey =
    '-----BEGIN CERTIFICATE-----\n' +
    'MIIC/DCCAeQCCQDcEt8bJJLCwjANBgkqhkiG9w0BAQsFADBAMQswCQYDVQQGEwJU\n' +
    'SDEQMA4GA1UECAwHQkFOR0tPSzEQMA4GA1UEBwwHQkFOR0tPSzENMAsGA1UECgwE\n' +
    'VEVTVDAeFw0yMzAzMjQwODU0MzdaFw0zMzAzMjEwODU0MzdaMEAxCzAJBgNVBAYT\n' +
    'AlRIMRAwDgYDVQQIDAdCQU5HS09LMRAwDgYDVQQHDAdCQU5HS09LMQ0wCwYDVQQK\n' +
    'DARURVNUMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzTjbcjIGVVbq\n' +
    'Xt92xDHxULPAB7giTmCSE6/A+LEqOF/aFxz4KitRCDBUP5Fa083EWAlCM0YtK6DV\n' +
    'mnxzrsz/IyJkE8ocSd9VPT+r+CEEwk8PSBs2hiII+VI1jbIc9+22AQurdsP79wFj\n' +
    'If2HuacNyjG4R+Qifg6kAIlwAkwh0AHQR8CqeiDjhJ4/fzdWj6pl26rq6JjNgCji\n' +
    'XPaefKWfxEMN/LxSU7PzuVQP46aXhiGrq/NimVGVq8d8hKFgzqtWf6ghnljuklOU\n' +
    'wtBKBiGU8+5asLySB8jtUjMIdoZ5shU1gv0UmfPRrOGU5eOlM+meRBysK0I7y41+\n' +
    'Jpg/TL5nrwIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQBXwvSlI0wpXwE1t4fMN5nt\n' +
    'nEkrM/2qP1F9tqPglbVfD/kFvnXTnvQ3aFLw+uVOd3frhR89YQQ2p6tFUEXtX84B\n' +
    '6DHJEoTS/1BEpSIdcyDUxHDYpnF3MPsJzjhlDzL8vC4MtGigOlLhBLy70AymH9aH\n' +
    '5DaNyCvTg5MWI/hmsD6XjhusAEpSUSCwkFATOCH5yzbfOW1dL9WgyBEnHtRtra1R\n' +
    'o+lxR4y912nlE26uB0FlCGW6Osf8ot5tdItf5tJ8OLpVtGUYnur8HrYggaWmDV6I\n' +
    'MDJl7QN4Gmldj+BdmvHMMsCSu8s66tVxrW/vOOPJ588R4dWrhbsnltCcBhPAB/aZ\n' +
    '-----END CERTIFICATE-----';
const privateKey =
    '-----BEGIN PRIVATE KEY-----\n' +
    'MIIEwAIBADANBgkqhkiG9w0BAQEFAASCBKowggSmAgEAAoIBAQDNONtyMgZVVupe\n' +
    '33bEMfFQs8AHuCJOYJITr8D4sSo4X9oXHPgqK1EIMFQ/kVrTzcRYCUIzRi0roNWa\n' +
    'fHOuzP8jImQTyhxJ31U9P6v4IQTCTw9IGzaGIgj5UjWNshz37bYBC6t2w/v3AWMh\n' +
    '/Ye5pw3KMbhH5CJ+DqQAiXACTCHQAdBHwKp6IOOEnj9/N1aPqmXbquromM2AKOJc\n' +
    '9p58pZ/EQw38vFJTs/O5VA/jppeGIaur82KZUZWrx3yEoWDOq1Z/qCGeWO6SU5TC\n' +
    '0EoGIZTz7lqwvJIHyO1SMwh2hnmyFTWC/RSZ89Gs4ZTl46Uz6Z5EHKwrQjvLjX4m\n' +
    'mD9MvmevAgMBAAECggEBAMYQUOMm2qv0haBpBcQW+3LK+NO6aAnC9FjhsFmVC017\n' +
    'XQ4fnHd+dOd1VWpAjCuNFSluTiEUYrYPtPgzkqarHLa5E2NyFdlKHYdOc1e37lLm\n' +
    'YLZT5UyRfp26NQt7UrAKETVzINowDnb3NMjyWtLYItv5HoTr7kpBMRF/k8Xz2lJY\n' +
    'IvQXeh/4X9vruGNNM9E65jBK1baCd7oPwk93zg6iim0EYTQyjo2Kso1PDbnSbKcA\n' +
    '9lv3p6Wg6FopYoQVXRzw6QLHSPAcaHF6DXrYUWr2Fu3arGcyeUUX2Hi+XL+XVVKJ\n' +
    'u86rxj42zXkwEJtzhkh1aIe+7sKXy5IthpEahXT8tuECgYEA7qP1UNNDFwPLEen0\n' +
    'DyrvXWmZ08pjBQmkD6eziVTBJozDohSYmCEzaU6zbz7efkQZglBhzG9M+bqOdIOc\n' +
    '4JIvIaPWSpqeyoaYAdM2FfLj4cvmQUJqpN2YHFkk4cBjIDFiIozLJHyKuFko6L5J\n' +
    '382cvO850UwnS7fyrGXMDMntZd8CgYEA3CaSNF2ccEhj38z48L7mI8nvXAoKlJwp\n' +
    'U6kI06bGZr0BRbSVzaoqYUVdbMXrve1oND/bN8Qo48t+ibpwqXYl3kVDuMh+FGYw\n' +
    'eWfTfzOFUHtXFzvWdJ+zk4spbrn5gyikBkmqZWIieDe0DRx/ior5iXA3VWdFyFXp\n' +
    'ketnZ0lfGDECgYEAt2uF7i2y70mXF5m+YLobaKz18vcnzINweifnsrJWEw82fqld\n' +
    '7+/02AgJmoOz91DYWnT19m/FtlxRifRu65zwZObMmmLlkbyJsT1p4MzjonVZ8Obf\n' +
    'mQBJHeDWnD2G8wOB7hRRPyYKaU7+RoWbuk0LH5yvz9K8kVI9T4yenWXG9fkCgYEA\n' +
    'gun8717rdGnX2nJNZvxeZtHioNznxc/HU5SlRxdZzCaA5y6oFpEmeomBMPnRYjQX\n' +
    'T1rZxaPEnRGZwdU4wc0cX7zYtL2lHARYtxliz7WXhXCTLaHLubZuV0Ld9JZrJe+4\n' +
    '+nQ7++YLkWmujE1yGrTiBzTP8t1ixesw5jESYH1lK0ECgYEA1sc78HG5kHF0aNgX\n' +
    'vHjfQ80JEvHYxZ8COpZGd+O5QBotO7aRz/3uL40k5NCBpUBmy5VNyPsVGQAmINT6\n' +
    '5BOlAOB5BnAL9eksDgdUfiwNv2y9kLcMDRx4eW0kQfXeouZx8cIKJPbZ8URsSUDW\n' +
    'PWPcEt2yP5bytFQ+KF1pe/y55CY=\n' +
    '-----END PRIVATE KEY-----';

jose.importX509(publicKey, 'PS256').then((publicKey) => {
    console.log("JWE initiated......")
    new jose.CompactEncrypt(
        new TextEncoder().encode('Hi! I am a message'),
    )
        .setProtectedHeader({alg: 'RSA-OAEP', enc: 'A256GCM'})
        .encrypt(publicKey)
        .then((jwe) => {
            console.log("Encrypted 'Hi! I am a message' as " + jwe)
            jose.importPKCS8(privateKey, 'PS256').then((privateKey) => {
                new jose.CompactSign(
                    new TextEncoder().encode(jwe),
                )
                    .setProtectedHeader({alg: 'PS256'})
                    .sign(privateKey).then((jws) => {
                    console.log("Signing done!")
                    jose.compactVerify(jws, publicKey).then((verified) => {
                        console.log("Verified signature!")
                        jose.compactDecrypt(verified.payload, privateKey).then((decrypted) => {
                            console.log(`Decrypted message as '${decrypted.plaintext.toString()}'`)
                        }).catch((err) => {
                            console.log(err)
                        })
                    })
                })
                    .catch(function (error) {
                        console.log(error);
                    });
            });
        });
});

