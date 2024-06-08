# from flask import request, render_template, Flask

# app = Flask(__name__)

# @app.route('/')
# def home():
#     return render_template('index.html')

# if  __name__ == '__main__':
#     app.run(debug=True)

from specklepy.api.client import SpeckleClient
from specklepy.api.credentials import get_default_account
from specklepy.transports.server import ServerTransport
from specklepy.api import operations
from specklepy.objects.geometry import Mesh
from specklepy.objects.base import Base



HOST= 'https://speckle.xyz/'

# HOST = "localhost:3000"
STREAM_ID = "63254325be"
COMMIT_ID = "1e9b6af4fb"


client = SpeckleClient(host=HOST)

account = get_default_account()

#Get the specified commit data
commit = client.commit.get(STREAM_ID, COMMIT_ID)
referenced_object_id = commit.referencedObject

# Initialize ServerTransport
transport = ServerTransport(client=client, stream_id=STREAM_ID)
received_object = operations.receive(obj_id=referenced_object_id, remote_transport=transport)


# Function to extract and print mesh information
def extract_mesh_info(obj):
    meshes = []
    stack = [obj]
    
    while stack:
        current_obj = stack.pop()
        
        if isinstance(current_obj, Base):
            # Check if the object is a Mesh
            if isinstance(current_obj, Mesh):
                meshes.append(current_obj)
            
            # Add dynamic members to the stack
            for member_name in current_obj.get_member_names():
                member_value = getattr(current_obj, member_name)
                if isinstance(member_value, (Base, list)):
                    stack.append(member_value)
        elif isinstance(current_obj, list):
            stack.extend(current_obj)
    
    return meshes

# Extract meshes from the received object
meshes = extract_mesh_info(received_object)


for i, mesh in enumerate(meshes, start=1):
    print(f"Mesh {i}:")
    print(f"  Vertices: {len(mesh.vertices)//3} points")
    print(f"  Faces: {len(mesh.faces)//3} triangles")
    print(f"  Colors: {len(mesh.colors)//4 if mesh.colors else 'None'}")
    print(f"  Texture Coordinates: {len(mesh.textureCoordinates)//2 if mesh.textureCoordinates else 'None'}")
    print(f"  Volume: {mesh.volume} m3")
