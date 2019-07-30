<Column title="Age" dataIndex="age" key="age" />
    <ColumnGroup title="Name">
        <Column title="First Name" dataIndex="firstName" key="firstName" />
        <Column title="Last Name" dataIndex="lastName" key="lastName" />
    </ColumnGroup>

    <Column title="Address" dataIndex="address" key="address" />
    <Column
        title="Tags"
        dataIndex="tags"
        key="tags"
        render={tags => (
            <span>
                {tags.map(tag => (
                    <Tag color="blue" key={tag}>
                        {tag}
                    </Tag>
                ))}
            </span>
        )}
    />
    <Column
        title="Action"
        key="action"
        render={(text, record) => (
            <span>
                <a href="javascript:;">Invite {record.lastName}</a>
                <Divider type="vertical" />
                <a href="javascript:;">Delete</a>
            </span>
        )}
    />