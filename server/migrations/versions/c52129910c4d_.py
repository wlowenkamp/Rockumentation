"""empty message

Revision ID: c52129910c4d
Revises: 
Create Date: 2023-09-22 02:56:49.167932

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c52129910c4d'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('password', sa.String(), nullable=False),
    sa.Column('profile_picture', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('username')
    )
    op.create_table('collection',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], name=op.f('fk_collection_user_id_user')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('album',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('image', sa.String(), nullable=False),
    sa.Column('artist', sa.String(), nullable=False),
    sa.Column('genre', sa.String(), nullable=False),
    sa.Column('release_year', sa.Integer(), nullable=False),
    sa.Column('collection_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['collection_id'], ['collection.id'], name=op.f('fk_album_collection_id_collection')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('album')
    op.drop_table('collection')
    op.drop_table('user')
    # ### end Alembic commands ###