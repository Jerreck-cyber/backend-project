from flask import Flask, jsonify

app = Flask(__name__)

# Sample GeoJSON data
geojson_data = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [-104.05, 48.99], [-97.22,  48.98], [-96.58,  45.94], 
                    [-104.03, 45.94], [-104.05, 48.99]
                ]]
            },
            "properties": {
                "name": "Sample State",
                "population": 1000000
            }
        }
    ]
}

@app.route('/api/geojson', methods=['GET'])
def get_geojson():
    return jsonify(geojson_data)

if __name__ == '__main__':
    app.run(debug=True)
